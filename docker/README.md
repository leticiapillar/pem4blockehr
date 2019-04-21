# Configuração do ambiente Ethereum usando Docker

- Scripts para montar uma rede privada Ethereum usando a implementação Go Ethereum.
    - https://github.com/ethereum/go-ethereum
    - https://geth.ethereum.org/

- Os scripts são baseados no projeto Vertigo, com adaptações para o contexto do projeto **pem4blockehr**.
    - https://github.com/vertigobr/ethereum>

- Os scripts estão na raiz do diretório `/docker`.

### Para o projeto pem4blockehr
- Execute os passos abaixo:
    - ./bootnode.sh
    - ./runnode.sh node1
    - copiar as chaves do diretório `/docker/src/keystore` para `.ether-node1/keystore`
    - RPC_PORT=8545 ./runminer.sh node1
    - ./runnode.sh node2
    - RPC_PORT=8546 ./runnode.sh node2


## Execução rápida: 
*Desde que o arquivo genesis.json já exista, caso contrário olhar o passo 1.*

- ./bootnode.sh
- ./runnode.sh node1
- ./runnode.sh node2
- ./runminer.sh miner1


### Arquivo genesis.json
- O arquivo `genesis.json` esta configurados para alocar 10 contas com uma determinada quantidade de Ether. As chaves das contas estão no diretório `/docker/src/keystore`. Desta forma as chaves devem ser copiadas para o diretóro `.ether-node1/keystore`.


## Scripts: passos de execução

### Passo 1:
- ./genesis.sh
    - cria um novo arquivo "genesis.json" a partir do template "src/genesis.json.template", com algumas variaveis definidas no proprio arquivo ./genesis.sh

### Passo 2:
- ./bootnode.sh
    - executa o ethereum bootnode com o nome ethereum-bootnode
- ./getbootnodeurl.sh
    - retorna o endereço ip interno do container, exemplo do retorno 
    `enode://55f59090d4f4f52f65c4adb77c48e155a371fea662a942a8642915adc54f243041bbaedd8b0562addc415cf6ecb0ab13bc43ac58b194878c09d06c4616a8153e@172.19.0.2:30301`, usado no arquivo `./runnode.sh` para conectar os nós da rede de forma dinamica

### Passo 3:
- ./runnode.sh <nome-do-container>
    - executa um nó de não mineração em um contêiner passando nome como argumento, ex: `runnode.sh node1`, roda um container de nome `ethereum-node1`
    - para checar o log execute: `docker logs ethereum-node1`
    - execute este comando novamente para adicionar outro nó a rede, , ex: `runnode.sh node2`, roda um container de nome `ethereum-node2`

### Passo 4:
- ./showpeers.sh <nome-do-container>
    - executa o comando `admin.peers` no console do geth, este comando lista os peers da rede, cada no da rede precisa fazer referencia a outro nó da mesma rede para que ocorra a comunicação

### Passo 5:
- ./runminer.sh <nome-do-container>
    - executa um nó de mineração, ex: ex: `runminer.sh miner1`, roda um container de nome `ethereum-miner1`
    - para checar o log execute: `docker logs -f ethereum-miner1`
    - parar a mineração do um nó `docker exec -ti ethereum-miner1 geth --exec 'miner.stop()' attach`
    - iniciar a mineração do um nó `docker exec -ti ethereum-miner1 geth --exec 'miner.start()' attach`

## Outros Scripts: usados para remover ou recriar o ambiente

- ./killnode.sh <nome-do-container>
    - para e remove um nó específico, ex: `killnode.sh node1`

- ./killall.sh
    - para e remove todos os containers criados

- ./wipeall.sh
    - recomeça do zero, ou seja, remove os containers e apaga os diretorio auxiliares criados para a execução


## Usando uma Ethereum Wallet

- Para criar um nó minerador que exponha a porta 8545 (padrão) para conectar a api
    - ./bootnode.sh
    - ./runnode.sh node1
    - RPC_PORT=8545 ./runminer.sh wallet

- Ethereum Wallet
    - Para conectar o cliente de carteira execute o comando:
    `/Applications/Ethereum\ Wallet.app/Contents/MacOS/Ethereum\ Wallet --rpc http://localhost:8545`

- Criar uma conta por Ethereum Wallet, copiar a chave da conta para vincular como ether base, comando `ETHERBASE=0x1a5f324124c8cEBD5b73BDfE16a414abF8b845D4 RPC_PORT=8545 ./runminer.sh wallet`, recria o container `ethereum-wallet`
- verificar o log `docker logs -f ethereum-wallet`, esperar o DRAG terminar e reabrir o cliente de carteira.


## Usando comandos do Docker para algumas funções:

- Verificar o log no console dos nós
    - `docker logs -f ethereum-node1`
    - `docker logs -f ethereum-node2`

- Criar uma conta em nó, con a senha `teste123`
    - `docker exec -ti ethereum-node1 geth --exec 'personal.newAccount("teste123")' attach`

- Vincular a primeira conta como a conta coinbase
    - `docker exec -ti ethereum-node1 geth --exec 'eth.coinbase' attach`

- Listas as contas de um nó
    - `docker exec -ti ethereum-node1 geth account list`
    - `docker exec -ti ethereum-miner1 geth --exec 'eth.accounts' attach`

- Desbloquear uma conta de um nó
    - `docker exec -ti ethereum-node1 geth --exec 'personal.unlockAccount("0x1172227483164caa5c2b0c91639435f64859f28a", "teste123")' attach`

- Parar a mineração de um nó
    - `docker exec -ti ethereum-node1 geth --exec 'miner.stop()' attach`

- Iniciar a mineração de um nó
    - `docker exec -ti ethereum-node1 geth --exec 'miner.start()' attach`
    - `docker exec -ti ethereum-miner1 geth --exec 'miner.start(2)' attach`

- Listar os containers docker
    - `docker container ls` - em execução
    - `docker container ps -a`

- Parar os containers dockers com o nome ethereum
    - `docker stop $(docker ps -q -f name=ethereum)`

- Iniciar cada um dos containers
    - `docker start ethereum-bootnode`
    - `docker start ethereum-node1`
    - `docker start ethereum-wallet`


## Fontes:
- https://medium.com/@andrenit/buildind-an-ethereum-playground-with-docker-part-1-introduction-80be173aaa7a
- https://github.com/vertigobr/ethereum
- https://github.com/ethereum/go-ethereum/wiki/Private-network
- https://web3js.readthedocs.io/en/1.0/index.html
- https://github.com/ethereum/go-ethereum/wiki/Managing-your-accounts

