from sqlmodel import SQLModel, Field, create_engine
from datetime import datetime
from typing import Optional
import os
import time
from sqlalchemy.exc import OperationalError

# Configuração do banco de dados no Docker
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:pass@db:5432/agentflow")
engine = create_engine(DATABASE_URL)

# ESTA É A CLASSE QUE O PYTHON NÃO ESTÁ ENCONTRANDO
class AgentJob(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    agent_name: str
    status: str  # RUNNING, SUCCESS, FAILED
    started_at: datetime = Field(default_factory=datetime.utcnow)
    finished_at: Optional[datetime] = None
    result_summary: Optional[str] = None

def create_db_and_tables():
    """Tenta criar as tabelas com retentativa para esperar o Postgres subir"""
    retries = 5
    while retries > 0:
        try:
            SQLModel.metadata.create_all(engine)
            print("✅ Tabelas criadas com sucesso!")
            break
        except OperationalError:
            retries -= 1
            print(f"⏳ Aguardando banco de dados... ({retries} tentativas restantes)")
            time.sleep(3)