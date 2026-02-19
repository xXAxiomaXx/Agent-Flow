## Portugues

# 🚀 AgentFlow | Orquestrador de Agentes em Tempo Real

**AgentFlow** é uma plataforma de monitoramento e execução de automações assíncronas desenvolvida para cenários que exigem alta observabilidade. O sistema permite disparar scripts Python complexos em segundo plano e acompanhar logs de execução via WebSockets, garantindo que o usuário nunca perca o estado de um processo.

---

## 🛠️ Stack Tecnológica

O projeto foi construído utilizando uma arquitetura de microserviços containerizada:

* **Frontend:** Next.js 16 (Turbopack), TypeScript, Tailwind CSS, Lucide React e Recharts para métricas.
* **Backend API:** FastAPI (Python 3.12) com suporte assíncrono e tipagem estrita.
* **Processamento Assíncrono:** Celery + Redis (Message Broker) para garantir escalabilidade horizontal.
* **Persistência:** PostgreSQL (via SQLModel) para auditoria completa e histórico de jobs.
* **Infraestrutura:** Docker e Docker Compose para isolamento total do ambiente de desenvolvimento.

---

## 🏗️ Arquitetura do Sistema



1.  **Client-Side:** O dashboard Next.js se conecta à API e estabelece um canal de WebSocket para logs.
2.  **API Gateway:** O FastAPI recebe requisições, registra a tarefa no PostgreSQL e despacha o comando para o Redis.
3.  **Task Queue:** O Redis atua como o intermediário, enfileirando as tarefas para os trabalhadores.
4.  **Worker:** Um container Python independente consome a fila, executa a lógica e publica logs em tempo real.

---

## 🌟 Diferenciais Técnicos

* **Real-time Observability:** Implementação de Pub/Sub com Redis para streaming de logs via WebSockets sem sobrecarregar a API principal.
* **Persistence Layer:** Auditoria de tarefas com SQLModel, permitindo consultar o histórico de sucesso/falha de cada agente.
* **Engineering Excellence:** Ambiente 100% containerizado, facilitando o deploy em ambientes de Cloud (AWS/GCP/Azure).
* **Modern UI/UX:** Dashboard com gráficos de performance e feedback visual instantâneo de estados.

---

## 🚀 Como Executar

Certifique-se de ter o **Docker** instalado.

1. Clone o repositório:
   `git clone https://github.com/seu-usuario/agentflow.git`

2. Suba todos os serviços com um único comando:
   `docker compose up --build`

3. Acesse o dashboard:
   `http://localhost:3000`

---


## English

# 🚀 AgentFlow | Real-Time Agent Orchestrator

**AgentFlow** is a monitoring and execution platform for asynchronous automations built for scenarios that demand high observability. The system can trigger complex Python scripts in the background and stream execution logs via WebSockets, ensuring you never lose the state of a process.

---

## 🛠️ Tech Stack

The project is built on a containerized microservices architecture:

* **Frontend:** Next.js 16 (Turbopack), TypeScript, Tailwind CSS, Lucide React, and Recharts for metrics.
* **Backend API:** FastAPI (Python 3.12) with async support and strict typing.
* **Async Processing:** Celery + Redis (message broker) for horizontal scalability.
* **Persistence:** PostgreSQL (via SQLModel) for full auditability and job history.
* **Infrastructure:** Docker and Docker Compose for complete development environment isolation.

---

## 🏗️ System Architecture

1. **Client-Side:** The Next.js dashboard connects to the API and opens a WebSocket channel for logs.
2. **API Gateway:** FastAPI receives requests, registers the task in PostgreSQL, and dispatches the command to Redis.
3. **Task Queue:** Redis acts as the intermediary, queuing tasks for workers.
4. **Worker:** A dedicated Python container consumes the queue, executes the logic, and publishes logs in real time.

---

## 🌟 Technical Highlights

* **Real-Time Observability:** Redis Pub/Sub streams logs via WebSockets without overloading the main API.
* **Persistence Layer:** SQLModel task audits allow querying success/failure history for each agent.
* **Engineering Excellence:** Fully containerized environment that simplifies deployment to cloud providers (AWS/GCP/Azure).
* **Modern UI/UX:** Dashboard with performance charts and instant visual feedback for states.

---

## 🚀 How to Run

Make sure **Docker** is installed.

1. Clone the repository:
   `git clone https://github.com/seu-usuario/agentflow.git`

2. Start all services with one command:
   `docker compose up --build`

3. Open the dashboard:
   `http://localhost:3000`

---

Developed by EM DEV - Fullstack Software Engineer focused on Python and the React ecosystem.