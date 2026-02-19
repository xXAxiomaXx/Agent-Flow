import asyncio
import json
import os
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import redis.asyncio as aioredis
from sqlmodel import Session, select

# Importações do nosso novo sistema de dados
from models import AgentJob, engine, create_db_and_tables
from worker import execute_automation

app = FastAPI(title="AgentFlow API - Persistence Layer")

# Evento de inicialização para garantir que o banco de dados esteja pronto
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

redis_url = os.getenv("REDIS_URL", "redis://redis:6379/0")

@app.websocket("/ws/logs")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    async_redis = aioredis.from_url(redis_url)
    pubsub = async_redis.pubsub()
    await pubsub.subscribe("agent_logs")

    try:
        async for message in pubsub.listen():
            if message["type"] == "message":
                data = json.loads(message["data"].decode("utf-8"))
                await websocket.send_text(data["message"])
    except WebSocketDisconnect:
        print("Cliente de logs desconectado")
    finally:
        await pubsub.unsubscribe("agent_logs")
        await async_redis.close()

@app.post("/run-agent/{name}")
def run_agent(name: str):
    """
    Cria um registro no banco e dispara o worker assíncrono.
    """
    # 1. Criar o registro da tarefa no banco de dados (Status: RUNNING)
    new_job = AgentJob(agent_name=name, status="RUNNING")
    
    with Session(engine) as session:
        session.add(new_job)
        session.commit()
        session.refresh(new_job) # Atualiza para obter o ID gerado pelo Postgres
        
        # 2. Disparar o worker passando o ID do banco de dados
        # Note que agora passamos 'new_job.id' como argumento
        execute_automation.delay(name, new_job.id)
        
    return {
        "message": "Automação iniciada",
        "job_id": new_job.id,
        "status": new_job.status
    }

@app.get("/jobs")
def get_jobs():
    """
    Retorna o histórico de todas as automações para o frontend.
    """
    with Session(engine) as session:
        statement = select(AgentJob).order_by(AgentJob.started_at.desc())
        results = session.exec(statement).all()
        return results