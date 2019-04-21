#!/bin/bash
NODE_NAME=$1
NODE_NAME=${NODE_NAME:-"miner1"}
ETHERBASE=${ETHERBASE:-"0x0b475e1b424e3c7176ca7189cf6e81098bd3a45f"}
./runnode.sh $NODE_NAME --mine --minerthreads=1 --etherbase="$ETHERBASE"
