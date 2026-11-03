# 📡 Guia de Endpoints da API REST (Spring Boot / DDD)

API remota em produção: `https://transporte-sustentavel-api.onrender.com`

| Recurso | Método | Descrição |
|---|---|---|
| `/transportes` | `GET` | Lista todos os transportes sustentáveis |
| `/transportes/{id}` | `GET` | Busca detalhes do transporte por ID |
| `/transportes` | `POST` | Cadastra novo modal de transporte |
| `/transportes/{id}` | `DELETE` | Remove transporte cadastrado |
| `/usuarios` | `GET` | Lista usuários da plataforma |
| `/usuarios` | `POST` | Cadastra novo usuário |
| `/usuarios/{id}/cartao` | `GET` | Consulta saldo de pontos e bilhete |
| `/passagens` | `GET` | Lista passagens disponíveis |
| `/resgates` | `GET` | Consulta histórico de resgates |
| `/resgates` | `POST` | Realiza novo resgate de passagem |
| `/resgates/{id}` | `DELETE` | Cancela resgate e devolve pontos |