# multiSelectDropDown

A Multiselect Dropdown built using AngularJS and Bootstrap  
# 使用  
## 导入
multiSelectDropDown.min.js  
multiselect.css  
bootstrap.min.css  
## 添加模块  
var app = angular.module("appContent", ['multiInputSelection'])  
## 使用标签  
<multi-select-drop-down
                max-show="3"
                on-change="setTabDirty"
                model="selectedOptions"
                my-model="myData"
                value-filed="value"
                data="options">
</multi-select-drop-down>  
## 属性说明  
on-change：选项选择事件（非必须）  
model：初始化选中的项，（必须  
my-model，value-filed：一起使用(非必须)，前者为需要得到的
选项数据结果，后者为选择的属性。  
data:数据源（必须）为对象数组形式，对象的属性为value,name  
[Demo example](https://plnkr.co/edit/RyILWrBwWh4Nxh04W47R?p=preview)


