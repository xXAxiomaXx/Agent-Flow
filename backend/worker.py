import time
import json
import redis
from celery import Celery
import os
from datetime import datetime
from sqlmodel import Session
from models import engine, AgentJob # Importamos a conexão e o modelo

# Conexão síncrona para o Worker
redis_client = redis.from_url(os.getenv("REDIS_URL", "redis://redis:6379/0"))

celery_app = Celery(
    "worker",
    broker=os.getenv("REDIS_URL", "redis://redis:6379/0"),
    backend=os.getenv("REDIS_URL", "redis://redis:6379/0")
)

@celery_app.task(name="execute_automation")
def execute_automation(agent_name: str, job_id: int, duration: int = 10):
    """
    Executa a automação e persiste o resultado no PostgreSQL.
    """
    for i in range(duration):
        time.sleep(1)
        log_message = f"[{agent_name}] Processando etapa {i+1}/{duration}..."
        
        # PUBLICA o log no Redis para o WebSocket do Frontend
        redis_client.publish("agent_logs", json.dumps({"message": log_message}))
        print(log_message)
    
    # --- PERSISTÊNCIA NO BANCO DE DADOS ---
    with Session(engine) as session:
        # Busca o registro da tarefa que foi criado pela API
        job = session.get(AgentJob, job_id)
        if job:
            job.status = "SUCCESS"
            job.finished_at = datetime.utcnow()
            job.result_summary = f"Concluído: {duration} etapas processadas."
            session.add(job)
            session.commit()
    
    redis_client.publish("agent_logs", json.dumps({"message": f"✅ {agent_name} concluído!"}))
    return {"status": "completed", "job_id": job_id}