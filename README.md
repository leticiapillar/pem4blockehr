# PEM4BLOCKEHR

## A Blockchain Performance Evaluation Model Applied to Electronic Health Records

### Abstract:
This article proposes pem4BlockEHR, a model for Blockchain performance evaluation, applied to electronic health records. Its purpose is to provide a functional execution environment of a Blockchain platform applied to transferring electronic health records. The proposal uses the application of workloads in the model in order to collect data for performance analysis. The implementation of the model used the Ethereum Blockchain platform in its private version, in order to describe the performance of this platform applied to the transfer of health records. For data analysis, the quantitative method was used, describing the execution time, latency, and transfer rate metrics. The results based on a variable number of transactions, showed that Ethereum presented a consistent behavior in scenarios with high workload, and in some scenarios, the experiments showed delays in sending fragmented transactions.


## Um Modelo de Avaliação de Desempenho do Blockchain aplicado a Prontuários Eletrônicos

### Resumo:
Este trabalho trata do pem4BlockEHR, um modelo de avaliação de desempenho do Blockchain aplicado a prontuários eletrônicos. Seu objetivo é proporcionar um ambiente de execução funcional de uma plataforma Blockchain aplicada a transferência de registros eletrônicos de saúde, de forma que através da aplicação de cargas de trabalho o modelo possa coletar dados para a realização de uma análise de desempenho. A implementação do modelo ocorreu através da execução de etapas que descrevem as principais funcionalidades, considerando algumas premissas que a plataforma de Blockchain deve possuir para que o contexto do trabalho seja mantido. A implementação do modelo utilizou a plataforma de Blockchain Ethereum na sua versão privada com o objetivo de descrever o desempenho desta plataforma aplicada a transferência de registros de saúde. Para análise dos dados, o método quantitativo foi utilizado, descrevendo os dados sob as métricas de tempo de execução, latência e taxa de transferência. Os resultados baseados em um número variável de transações, mostraram que o Ethereum apresentou um rendimento consistentemente maior em cenários com alta carga de trabalho, e cenários com atraso no envio fragmentado de transações.

---

- Este é o meu TCC (Trabalho de Conclusão de Curso) para o curso de Sistemas de Informação na Unisinos, apresentado em Dezembro de 2018.

- Passos:
    - 1. Configurar o ambiente do blockchain
    - 2. Executar o script para deploy do *smart contract*
    - 3. Executar os scripts das cargas de trablho


## Estrutura de arquivos:
- No diretório `/docker` estão os scripts para criar o ambiente Blockchain Ethereum usando Docker.
- No diretório `/app` está a aplicação para conectar com a rede Blockchain Ethereum, e aplicar as cargas de trabalho.
- No diretório `/docs` está o artigo de apresentação deste trabalho.
- Mais detalhes sobre a execução podem ser obtidas no arquivo README.md dentro dos respectivos diretórios.


