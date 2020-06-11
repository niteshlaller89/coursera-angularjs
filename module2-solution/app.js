(function(){
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)


    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var buyController = this;
        buyController.empty = false;

        buyController.items = ShoppingListCheckOffService.getBuyList();      
        buyController.AddItemToAlreadyBought = function(index) {
            var item = ShoppingListCheckOffService.getBuyList().splice(index, 1);
            ShoppingListCheckOffService.addToAlreadyBoughtList(item[0], function(flag){
                console.log("Buy List Flag: ", flag)
                buyController.empty = flag;
            });
        }      
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBoughtController = this;
        alreadyBoughtController.empty = true;
        ShoppingListCheckOffService.setEmptyFlagFunction(function(flag){
            console.log("Bought List Flag: ", flag)
            alreadyBoughtController.empty = flag;    
        });
        alreadyBoughtController.items = ShoppingListCheckOffService.getAlreadyBoughtList();     
    }

    function ShoppingListCheckOffService() {
        var checkOffService = this;
        checkOffService.lists = {
            toBuyList: [
                { name: "cookies", quantity: 10 },
                { name: "Pepsi", quantity: 10 },
                { name: "Bread", quantity: 10 },
            ],
        
            allreadyBoughtList: [],
        }
        checkOffService.getBuyList = function() {
            return checkOffService.lists.toBuyList;
        }

        checkOffService.setEmptyFlagFunction = function(boughtEmptyflagFunc)
        {
            checkOffService.boughtEmptyflagFunc = boughtEmptyflagFunc;
        }

        checkOffService.getAlreadyBoughtList = function(){
            return checkOffService.lists.allreadyBoughtList;
        }

        checkOffService.addToAlreadyBoughtList = function(item, setEmptyFlag) {
            checkOffService.boughtEmptyflagFunc(false);
            checkOffService.lists.allreadyBoughtList.push(item);
            if(!checkOffService.lists.toBuyList.length)
            {
                setEmptyFlag(true);
            }
            else {
                setEmptyFlag(false);
            }
        }
    }
})();