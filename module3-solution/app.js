(function(){
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownControllerFunc)
    .service('MenuSearchService', MenuSearchServiceFunc)
    .directive('foundItems', foundItemsDirective)
    
    NarrowItDownControllerFunc.$inject = ['$filter', 'MenuSearchService']
    function NarrowItDownControllerFunc($filter, MenuSearchService) {
        ctrl = this;
        ctrl.items = [];
        ctrl.s_keyword = "";
        ctrl.found = [];
        ctrl.searchItem = function() {
            ctrl.found = MenuSearchService.getMatchedMenuItems();
        }
        ctrl.onRemove = function(index) {
            ctrl.found.splice(index, 1);
        }
    }

    function foundItemsDirective() {
        return {
            restirct: 'EA',
            scope: {
                found: '<',
                onRemove: '&'
            },
            template: '<br><br><hr><div>\
                            <ol>\
                                <li ng-repeat=\'item in found\'>{{item.name}} , {{item.short_name}}, {{item.description}}\
                                <button ng-click="onRemove({index: $index})">Don\'t want this one!</button>\
                                </li>\
                            </ol>\
                        </div>',
        };
    }

    MenuSearchServiceFunc.$inject = ['$http'];
    function MenuSearchServiceFunc($http) {
        service = this;
        service.getMatchedMenuItems = function() {
            items = [];
            found = [];
            console.log(Date(), 'Service getMacthed called.', ctrl.s_keyword);
            $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function (result) {
                // process result and only keep items that match
                items = result.data.menu_items;
                //console.log(Date(), 'Got Result.', items);
                items.forEach((item, index) => {
                    if(item.description.search(ctrl.s_keyword) != -1)
                    {
                        found.push(item);
                    }
                });
                ctrl.s_keyword = "";
                //console.log(Date(), "Success: ", items);
            },
            function(result) {
                console.log(Date(), "Error: ", result.data);
            });
            return found;
        }
    }

})();