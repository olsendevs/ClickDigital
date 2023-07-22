# ClickDigital
plataforma para gestão de clientes + bot whatsapp

## Definições (Técnologias)

Backend: NodeJs + NestJS 
Banco de dados: MongoDB
Frontend: React + HorizonUI
Arquiterura: Monolito
Deploy: Docker + Compose
Hospedagem: AWS
WhatsApp: https://github.com/open-wa/wa-automate-nodejs

## Etapas do projeto

1 - Coletar todas as informações sobre funcionalidades e fluxos do sistema

2 - Desenhar a arquitetura dos 

3 - Desenvolver a API (backend) + integração com banco de dados

4 - Realizar deploy da API em homologação

5 - Desenvolver telas do frontend

6 - Integrar telas do frontend com API em homologação

7 - Realizar deploy do CMS em homologação

8 - Testar todos os fluxos do sistema

## Funcionalidades

- Realizar login com usuário e senha

- CRUD de serviços
- CRUD de planos
- CRUD de clientes que receberão avisos de expiração do seu plano/produto

- Realizar conexão com o whatsapp e salvar os cookies da conexão
- Enviar mensagens automaticas baseados nas configurações e salva-las no banco
- Criar chaves de referencia para informações dos clientes

## Entidades

- Customer: 
```
{
    name: string
    whatsapp: string
    login: string
    senha: string
    service: Service
    plan: Plan
    invoice: string
    validateDate: Date
    pushNotification: {
        5DaysBefore: boolean
        3DaysBefore: boolean
        1DayBefore: boolean
        EndDay: boolean
        1DayAfter: boolean
    } 
    comments: string
}
```
    
- Produto
- Plano
- Usuario
- Mensagem
- Configurações-Mensagens 
- Sessão-WhatsApp