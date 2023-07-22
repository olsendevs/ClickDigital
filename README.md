# ClickDigital
plataforma para gestão de clientes + bot whatsapp

# Arquitetura
## Definições (Técnologias)

Backend: NodeJs + NestJS 
Banco de dados: MongoDB
Frontend: React + HorizonUI
Arquiterura: Monolito
Deploy: Docker + Compose
Hospedagem: AWS
WhatsApp: https://github.com/open-wa/wa-automate-nodejs

## Etapas do projeto

``OK`` 1 - Coletar todas as informações sobre funcionalidades e fluxos do sistema

2 - Desenhar a arquitetura do sistema

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

- Global params:
```
{
    createAt: Date
    updateAt: Date
    deleted: boolean 
}
```

- Customer: 
```
{
    name: string
    whatsapp: string
    login: string
    password: string
    serviceId: Service
    planId: Plan
    invoice: string
    validateDate: Date
    pushNotification: {
        5DaysBefore: {
            active: boolean
            sended: boolean
        }
        3DaysBefore: {
            active: boolean
            sended: boolean
        }
        1DayBefore: {
            active: boolean
            sended: boolean
        }
        EndDay: {
            active: boolean
            sended: boolean
        }
        1DayAfter: {
            active: boolean
            sended: boolean
        }   
    } 
    comments: string
}
```
    
- Service:
```
{
    name: string
    cost: Decimal128
}
```

- Plan:
```
{
    name: string
    value: Decimal128
}
```

- User:
```
{
    name: string
    password: string
    whatsapp: string
    email: string
    company: string
}
```

- Message:
```
{
    content: string
    seasonId: Season
    customerId: Customer
}
```

- MessageConfigs: 
```
{
    5DaysBefore: {
        active: boolean
        message: string
    }
    3DaysBefore: {
        active: boolean
        message: string
    }
    1DayBefore: {
        active: boolean
        message: string
    }
    EndDay: {
        active: boolean
        message: string
    }
    1DayAfter: {
        active: boolean
        message: string
    }
}
```

- Season: 
```
{
    picture: string
    name: string
    whatsappId: string
}
```

## Desenhos de arquitetura

![Alt text](images/image.png)