# PEM4BLOCKEHR
## Um Modelo de Avaliação de Desempenho do Blockchain aplicado a Prontuários Eletrônicos

- Aqui constam os arquivos fontes da aplicação:
    - *Smart Contract*
    - *Scripts para deploy do smart contract*
    - *Scripts para execução das cargas de trabalho*

- Para a execução é necessário que:
    - 1. O ambiente esteja em execução
    - 2. O deploy do *smart contract* realizado
    - 3. Executar as cargas de trabalho para a coleta dos dados.


## Estrutura de diretórios:

- No diretório `/truffle`: 
    - *Smart Contract* com a implementação das regras de negócio deste trabalho. 
    - Testes unitários das respectivas regras.
    - Foi utilizada a ferramenta Truffle Framework e Ganache.
        - https://truffleframework.com/

- No diretório `/web3js`:
    - É uma aplicação em node utizando a lib web3js para conectar com a rede Ethereum.
        - Para instalar as dependências use o comando `npm install` neste diretório.
    
    - Realizar o deploy do *smart contract*, através do script `/web3js/src/deploy/deploy-contract.js`
        - Comando: `node src/deploy/deploy-contract.js`
    
    - Aplicar as cargas de trabalho que estão no diretório `/web3js/src/workload/`
        - `send_transaction.js`: envia um número X de transações de forma sequencial para o blockchain.
            - Comando: `node send_transaction.js 10` -  irá executar 10 transações.
        
        - `send_transaction_one_per_block.js` envia um número X de transações para o blockchain, adicionando um intervalo de tempo de 5 segundos a cada uma transação.
            - Comando: `node send_transaction_one_per_block.js 10` -  irá executar 10 transações com um intervalo de 5 segundos entre elas.
        
        - `send_transaction_five_per_block.js` envia um número X de transações para o blockchain, adicionando um intervalo de tempo de 5 segundos a cada 5 transação.
            - Comando: `node send_transaction_five_per_block.js 10` -  irá executar 50 transações com um intervalo de 5 segundos a cada 5 transações.
        
        - Ao final da execução um arquivo de log e gerado neste diretório com os tempos de execução das cargas.


## Alguns problemas identificados:

### NicolaOrritos, bug na versão beta 36, mas não na versão 34
https://github.com/ethereum/web3.js/issues/1102

web3js git:(develop) ✗ node src/deploy/test-send-methos-contract.js
transactionHash: 0x6e1bd34cb00f00d8330340714c4f4355e0d5da3cf1ca5463c43b17f16139900c
Error: Transaction was not mined within 50 blocks, please make sure your transaction was properly sent. Be aware that it might still be mined!
    at /Users/leticiapillar/projetos/pem4blockehr/api/web3js/node_modules/web3-core-method/src/index.js:396:42
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:189:7)
unlockAccountPatient: true
Error: Transaction was not mined within750 seconds, please make sure your transaction was properly sent. Be aware that it might still be mined!
    at /Users/leticiapillar/projetos/pem4blockehr/api/web3js/node_modules/web3-core-method/src/index.js:390:42
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:189:7)    

### Problemas ao conectar com WebSocker ###
- Para usar o websocker incluir o parametros no geth
`--ws --wsport 8546 --wsaddr=0.0.0.0  --wsorigins "*"`

- Erro no log do ethereum:
    - origin '' not allowed on WS-RPC interface
    Allowed origin(s) for WS RPC interface ["*"]
    connection not open on send()

- Erro no console de teste de conexao
    - Error: connection not open
    at WebsocketProvider.send (/Users/leticiapillar/projetos/pem4blockehr/api/web3js/node_modules/web3-providers-ws/src/index.js:276:18)
    at Timeout._onTimeout (/Users/leticiapillar/projetos/pem4blockehr/api/web3js/node_modules/web3-providers-ws/src/index.js:261:19)
    at ontimeout (timers.js:498:11)
    at tryOnTimeout (timers.js:323:5)
    at Timer.listOnTimeout (timers.js:290:5)
- Solução para o problema
    - https://github.com/ethereum/go-ethereum/issues/16608
    - Neste link a usuaria ( vzts ) recomenda não usar --wsorigins * no geth e passar no cabecalho o headers Origin
