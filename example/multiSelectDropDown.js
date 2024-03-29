var app =
angular.module('multiInputSelection', []);


app.directive('multiSelectDropDown', function () {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            myModel: '=',
            valueFiled: '@',
            multiselectoptions: '=data',
            maxlenghttoshowselectedvalues: '=maxShow',
            onChange: '=',
        },
        template:
        '<div class="my-btn-group"> \
            <input  style="display: inline-block;width: 100%;"  ng-model="model.toggletext" type="text" class="form-control input-sm" ng-focus="showDropDown()">\
            <div ng-show="open">\
                    <div class="input-group w-select-box"> \
                        <input class="form-control multiselect-search" type="text" placeholder="Search" ng-model="model.query">\
                        <span class="input-group-btn"> \
                            <button class="btn btn-default multiselect-clear-filter" ng-click="clearsearch()" type="button"><i class="glyphicon glyphicon-chevron-left"></i></button> \
                             <button class="btn btn-default multiselect-clear-filter" ng-click="closeDropDown()" type="button"><i class="glyphicon glyphicon-remove-circle"></i></button> \
                        </span> \
                    </div> \
            <ul class="multiselect-container my-dropdown-menu w-select-box" > \
                <li class="multiselect-item filter" value="0"> \
                </li> \
                <li class="multiselect-item multiselect-all"><label style="padding: 3px 20px 3px 40px;margin-top:0px;margin-bottom:0px" class="checkbox"><input type="checkbox" ng-model="model.selectall" ng-change="toggleselectall()">Select all</label></li> \
                <li ng-repeat="option in (filteredOptions = (multiselectoptions| filter:model.query))">\
                <label style="padding: 3px 20px 3px 40px;margin-top:0px;margin-bottom:0px" class="checkbox">\
                <input type="checkbox" ng-checked="isselected(option)" ng-model="option.Selected" ng-change="toggleselecteditem(option);">\
                {{option.name}}\
                </label>\
                </li> \
            </ul>\
             </div>\
        </div>',
        controller: function ($scope) {
            //切换 隐藏和显示
            $scope.showDropDown = function () {
                if (!$scope.open){
                    $scope.open = true;
                }
            };
            $scope.closeDropDown = function () {
                $scope.open = false;
            };
            //全选事件
            $scope.toggleselectall = function ($event) {
                var selectallclicked = true;
                if ($scope.model.selectall == false) {
                    selectallclicked = false;
                }
                $scope.doonselectallclick(selectallclicked, $scope.filteredOptions);
            };
            //点击全选按钮时设置列表选中状态
            $scope.doonselectallclick = function (selectallclicked, optionArrayList) {
                $scope.model = [];
                if (selectallclicked) {
                    angular.forEach(optionArrayList, function (item, index) {
                        item["Selected"] = true;
                        $scope.model.push(item);
                        if (angular.isDefined($scope.valueFiled)) {
                            $scope.myModel.push(item[$scope.valueFiled])
                        }
                    });

                    if (optionArrayList.length == $scope.multiselectoptions.length)
                    {
                        $scope.model.selectall = true;
                    }
                }
                else {
                    angular.forEach(optionArrayList, function (item, index) {
                        item["Selected"] = false;
                    });
                    $scope.model.selectall = false;
                    $scope.myModel=[];
                }
                $scope.settoggletext();
            };

            //单个item选择事件
            $scope.toggleselecteditem = function (option) {
                var intIndex = -1;
                angular.forEach($scope.model, function (item, index) {
                    if (item.value == option.value) {
                        intIndex = index;
                    }
                });

                if (intIndex >= 0) {
                    $scope.model.splice(intIndex, 1);
                    if (angular.isDefined($scope.valueFiled)) {
                        $scope.myModel.splice(intIndex, 1);
                    }

                }
                else {
                    $scope.model.push(option);
                    if (angular.isDefined($scope.valueFiled)) {
                        $scope.myModel.push(option[$scope.valueFiled]);
                    }
                }

                if ($scope.model.length == $scope.multiselectoptions.length) {
                    $scope.model.selectall = true;
                }
                else {
                    $scope.model.selectall = false;
                }
                $scope.settoggletext();
                if (typeof $scope.onChange === 'function') {
                    $scope.onChange(option);
                }
            };

            $scope.clearsearch = function () {
                $scope.model.query = "";
            };

            $scope.settoggletext = function () {
                if ($scope.model.length > $scope.maxlenghttoshowselectedvalues) {
                    $scope.model.toggletext = $scope.model.length + " Selected";
                }
                else {
                    $scope.model.toggletext = "";
                    angular.forEach($scope.model, function (item, index) {
                        if (index == 0) {
                            $scope.model.toggletext = item.name;
                        }
                        else {
                            $scope.model.toggletext += ", " + item.name;
                        }
                    });

                    if (!($scope.model.toggletext.length > 0)) {
                        $scope.model.toggletext = "None Selected"
                    }
                }
            };

            $scope.isselected = function (option) {
                var selected = false;
                angular.forEach($scope.model, function (item, index) {
                    if (item.value == option.value) {
                        selected = true;
                    }
                });
                option.Selected = selected;
                return selected;
            };



            var onload = function () {
                if ($scope.model.length == $scope.multiselectoptions.length) {
                    $scope.doonselectallclick(true, $scope.multiselectoptions);
                }
                if ($scope.model.length>0){
                    angular.forEach($scope.model, function (item, index) {
                        if (angular.isDefined($scope.valueFiled)) {
                            $scope.myModel.push(item[$scope.valueFiled])
                        }
                    });
                }
                $scope.settoggletext();
            }();
        }
    }
});

/**
 * 页面加载执行onload 方法，如果没有初始化，则设置默认提示None Selected
 * 点击按钮toggledropdown() open 设置为true，使列表展示
 *
 */
