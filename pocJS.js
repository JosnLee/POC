var myapp = angular.module('sortableApp', ['ui.sortable','ui.date']);


myapp.controller('sortableController', function ($scope, $http, $filter) {
    var tmpList = [];
    //var baseUrl = "http://"+window.location.hostname+":3050/";
    //var _apiHost = "http://"+window.location.hostname+':3060';
    var baseUrl = "http://192.168.0.29:3050/";
    var _apiHost = "http://192.168.0.29:3060";

    var _apiGameId = 4401;
    var _apiToken = "zDJj49szj8g17cD64iouWASGHIb3fjDi2v2ZNsxhhMK9VBEXbnMASV_5bkkSAniL";
    var _apiCall = {
        apiTopicList: {uri: '/portal/community/topic/list', ui: ''},
        apiTopicNew: {uri: '/portal/community/topic/create', ui: ''},
        apiIntNew: {uri: '/portal/community/intersitial/create', ui: ''},
        apiRewardNew: {uri: '/portal/community/reward/create', ui: ''}
    };


    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }


    $scope._id=getQueryString("id");


    $scope.dateOptions = {
        pickerType:"dateTimePicker",
        lang:'ch',
        timeFormat:"HH:00:00",
        dateFormat:"yy/mm/dd"

    };



    /**
     * 话题创建
     * @params eg:
     * {
         *    user_id: 80, //Y 虚拟用户ID
         *    category: 1, //Y 分类
         *    content: 'xxxx', // Y 内容
         *    picture_url: 123, // N 图片URL
         *    picture_data: 'file' // 图片文件流
         * }
     * @return json
     */
    $scope.category_class = [{"id": 1, "name": "综合", isChecked: 1}, {"id": 2, "name": "闲聊"}, {
        "id": 3,
        "name": "求助"
    }, {"id": 4, "name": "攻略"}, {"id": 5, "name": "心得"}];
    $scope.appearances = [{"id": 0, "name": "弱", isChecked: 1}, {"id": 1, "name": "中"}, {"id": 2, "name": "强"}];


    $scope.getTemplate = function () {

        var url = baseUrl + "store?m=acts&f=list";
        $http.get(url, {}).success(function (res) {
            $scope.activitys = res.rst;
            if (res.rst.length) {
                $scope.index = 0;
            } else {
                $scope.index = null;
            }
            console.log(res);
        }).error(function (err) {
            console.log(err)
        })
    }
    $scope.activitys = [];


    $scope.activeOPen = function () {
        $("#templateModal").modal("hide");
        $scope.rawScreens=[screen1Copy]
        $scope.activitys[$scope.index].areas.forEach(function(area){
            var itemTmp=[];
            $scope.activitys[$scope.index].items.forEach(function(item){
                if(area.id==item.actArea){
                    itemTmp.$$name=area.name;
                    itemTmp.$$beginDate=area.areaConfig.beginDate;
                    itemTmp.$$endDate=area.areaConfig.endDate;
                    itemTmp.push(item);
                }
            });
            $scope.rawScreens.push(itemTmp);
        });
        $scope.id = $scope.activitys[$scope.index]._id;

        $scope.activityTpl = angular.copy($scope.activitys[$scope.index].name);
    };
    $scope.templateDbClik = function (index) {
        $scope.index = index;
        $scope.activeOPen();
    };

    $scope.deleteArea=function(index){
       $scope.rawScreens.splice(index,1)
    };

    $scope.rawScreens = [
        [

            {
                actType: 104,
                name: '通知',

            },
            {
                actType: 102,
                name: '插屏通知 '
            },
            {
                actType: 101,
                 name: '发帖',
            },
            {
                actType: 105,
                name: '兑换码',
            },{
                actType: 103,
                name: '奖励 ',
            },{
                actType: 106,
                name: '排行版奖励 ',
            },{
                actType: 107,
                name: '登陆奖励 ',
            },

            {
                actType: 401,
                name: '统计 ',
            }
        ],
        []
    ];


    $scope.newArea=function(){

        $scope.rawScreens.push([])
    }
    var screen1Copy = angular.copy($scope.rawScreens[0]);
    $scope.event = {
        name: "",
    };


    $scope.activityClick = function (index, app) {
        if (app.actType == 101) {
            $("#myModal").modal("show");
            $scope.activityIndex = index;
            $scope.event.name = app.name;
            if (app.hasOwnProperty("config")) {
                $scope.content = app.config.content;
                $scope.category_class.forEach(function (category) {
                    if (category.id == app.config.category) {
                        category.isChecked = true;
                        $scope.categoryid = category.id;
                    } else {
                        category.isChecked = false;

                    }
                })
            }

        }
        if (app.actType == 102) {
            $scope.activityIndex = index;

            $("#pointModal").modal("show");
            $scope.event.name = app.name;

            if (app.hasOwnProperty("config")) {

                $scope.title = app.config.title;

                $scope.content = app.config.content;

            }


        }


        if (app.actType == 103) {
            $("#rewardModal").modal("show");
            $scope.activityIndex = index;
            $scope.event.name = app.name;
            if (app.hasOwnProperty("config")) {
                $scope.content = app.config.content;
                $scope.title = app.config.title;
                $scope.appearances.forEach(function (appearance) {
                    if (appearance.id == app.config.appearance) {
                        appearance.isChecked = true;
                    } else {
                        appearance.isChecked = false;

                    }
                })
            }


        }

    };

    $scope.beginDate=$filter('date')(new Date(),"yyyy/MM/dd hh:00:00");

    $scope.appearanceClick = function (appearance) {
        $scope.appearanceid = appearance.id;
        console.log(appearance)
    }

    $scope.categoryClick = function (category) {
        $scope.categoryid = category.id
        $scope.category_class.forEach(function (item) {
            if (item.categoryid == category.id) {
                category.isChecked = true;
            } else {
                category.isChecked = false;
            }
        })

    }

    //话题修改的确认按钮
    $scope.categorySure = function () {
        $scope.rawScreens[1][$scope.activityIndex].name = angular.copy($scope.event.name);
        var config = {user_id: "", category: angular.copy($scope.categoryid), content: angular.copy($scope.content)};
        $scope.rawScreens[1][$scope.activityIndex].config = config;
        $scope.rawScreens[1][$scope.activityIndex].actType = 101;


    };
    //插屏通知修改的确认按钮
    $scope.pointSure = function () {
        $scope.rawScreens[1][$scope.activityIndex].name = angular.copy($scope.event.name);


        var config = {
            title: angular.copy($scope.title),
            button_title: "OK",
            action: 0,
            action_value: "",
            start_time: Math.floor(new Date().getTime() / 1000 - 24 * 3600),
            end_time: Math.floor(new Date().getTime() / 1000 + 24 * 3600),
            show_delay: 0,
            versions: [1.0],
            points: [10009],
            content: angular.copy($scope.content)
        };
        $scope.rawScreens[1][$scope.activityIndex].actType = 102;
        $scope.rawScreens[1][$scope.activityIndex].config = config;
        console.log($scope.rawScreens[1][$scope.activityIndex])


    };
    //奖励修改的确认按钮
    $scope.rewardSure = function () {
        $scope.rawScreens[1][$scope.activityIndex].name = angular.copy($scope.event.name);
        var config = {
            title: angular.copy($scope.title),
            content: angular.copy($scope.content),
            appearance: angular.copy($scope.appearanceid),
            target: 0
        };
        $scope.rawScreens[1][$scope.activityIndex].config = config;
        $scope.rawScreens[1][$scope.activityIndex].actType = 103;


    };


    $scope.isNew = false;
    $scope.newTemplate = function () {
        $scope.isNew = true;
        $scope.saveAsTpl = false;
    };


    //新建活动（模板）的确定按钮
    $scope.saveTpl = function () {
        if ($scope.tempName) {
            $scope.event.name = angular.copy($scope.tempName);
            $scope.Tpl = angular.copy($scope.isTpl);
            $scope.tplSave($scope.Tpl).then(function (res) {

                $("#templateNewModal").modal("hide")
                $scope.id = res.data.rst._id;
                $scope.itemsUpdate().then(function (resItem) {

                });
                $scope.getTplById(res.data.rst._id);
            });
        }

    };

    $scope.getTplById = function (id) {
        $http.get(baseUrl + "store?m=acts&f=find&id=" + id).success(function (res) {

            console.log(res)
            $scope.rawScreens[1] = res.rst.items;
            $scope.activitys.name = res.rst.name;
            $scope.activityTpl = res.rst.name;
            $scope.activitys._id = res.rst._id;
        })
    }


    $scope.getTplById($scope._id);
    //修改活动

    $scope.itemsUpdate = function () {
        var items=[];
        var areas=[];
        for(var i=0;i<$scope.rawScreens.length;i++){
            if(i>0){
                var areaConfig={beginDate:$scope.rawScreens[i].$$beginDate+":00",endDate:$scope.rawScreens[i].$$endDate+":00"};

                areas.push({id:i-1,name:$scope.rawScreens[i].$$name,areaConfig:areaConfig});
                items=items.concat($scope.rawScreens[i]);
            }
        }



        if (!$scope.id) {
            $scope.saveAs();
            return;
        }



        return $http.get(baseUrl + "store?m=acts&f=update&id=" + $scope.id + "&items=" + angular.toJson(items)+"&areas="+angular.toJson(areas)).success(function (res) {
            $scope.apiCall(items)
            return res;
        }).error(function (error) {
            return error;
        })
    }
    //保存活动
    $scope.tplSave = function (Tpl) {
        return $http.get(baseUrl + "store?m=acts&f=new&name=" + $scope.event.name + "&bTpl=" + (Tpl ? 1 : 0)).success(function (res) {
            return res;
        }).error(function (error) {
            return error;

        })
    }
    $scope.list1 = $scope.rawScreens[0];
    $scope.list2 = $scope.rawScreens[1];


    $scope.sortingLog = [];

    $scope.sortableOptions = {
        placeholder: "app",
        connectWith: ".apps-container"
    };


    $scope.templateChecked = function (index) {
        $scope.index = index;
    }

    //删除
    $scope.delete = function (index,parentIndex) {

        $scope.rawScreens[parentIndex].splice(index, 1);

    }


    $scope.edit = function (app) {
        $scope.templateEdit = true;
    };

    //另存为模板或者活动
    $scope.saveAsTpl = false;
    $scope.saveAs = function () {
        $scope.saveAsTpl = true;
        $("#templateNewModal").modal("show");


    }
    //portal api
    $scope.apiCall = function (items) {
        items.forEach(function (item) {
            if (item.actType == 101) {

                var postData = {
                    "token": _apiToken,
                    "community_id": _apiGameId,
                    "user_id": 23845476,
                    "category": 0,
                    "content": item.config ? item.config.content : "系统预置"
                };


                $scope.postToApi(postData, _apiCall.apiTopicNew.uri, "urlencoded");

            }
            if (item.actType == 102) {

                var postData = {
                    "token": _apiToken,
                    "community_id": _apiGameId,
                    "title": item.config ? item.config.title : "系统预置",
                    "content": item.config ? item.config.content : "系统预置",
                    "button_title": "OK",
                    "action": 0,
                    "action_value": "",
                    "start_time": Math.floor(new Date().getTime() / 1000 - 24 * 3600),
                    "end_time": Math.floor(new Date().getTime() / 1000 + 24 * 3600),
                    "show_delay": 0,
                    "versions": "[\"1.0\"]",
                    "points": "[\"100010\"]",
                    "language": "ZH_CN"
                };

                $scope.postToApi(postData, _apiCall.apiIntNew.uri, "urlencoded");

            }
            if (item.actType == 103) {


                var postData = {
                    "token": _apiToken,
                    "community_id": _apiGameId,
                    "title": item.config ? item.config.title : "系统预置",
                    "content": item.config ? item.config.content : "系统预置",
                    "save_as": 1,
                    "target": 0,
                    "start_time": Math.floor(new Date().getTime() / 1000 - 24 * 3600),
                    "appearance": 0,
                    "button_title": "领取",
                    "end_time": Math.floor(new Date().getTime() / 1000 + 24 * 3600),
                    "language": "ZH_CN",
                    "rewards": JSON.stringify([{reward_id: 1431940605, value: "1000"}]),

                    "user_ids": "[]",
                    "versions": "[]"
                };
                console.log(postData)
                $scope.postToApi(postData, _apiCall.apiRewardNew.uri, "urlencoded");

            }
        })


    }


    $scope.postToApi = function (postData, url, contentType) {
        var postStr = "";
        if (contentType == 'urlencoded') {
            for (var p in postData) {
                postStr = postStr + (p + '=' + postData[p] + '&');

            }
            postStr = postStr.substring(0, postStr.length - 1)
        } else if (contentType == 'json') {
            postStr = angular.toJson(postData);
        }


        $http({

            url: _apiHost + url,
            token: _apiToken,

            method: "POST",

            headers: {

                'Content-Type': 'application/x-www-form-urlencoded'

            },

            data: postStr

        }).success(function (res) {
            console.log(url)
            if (res.code != 0) {
                if (url == _apiCall.apiRewardNew) {
                    alert("话题创建错误：" + JSON.stringify(res))

                }
                if (url == _apiCall.apiRewardNew) {
                    alert("奖励创建错误：" + JSON.stringify(res))

                }
                if (url == _apiCall.apiIntNew) {
                    alert("插屏创建错误：" + JSON.stringify(res))

                }
            } else {
                alert("保存成功")
            }
            console.log("跨域成功")
        });
    }

    $scope.sortingLog = [];

    function createOptions(listName) {
        var _listName = listName;
        var options = {
            placeholder: "app",
            connectWith: ".apps-container",
            activate: function () {
                console.log("list " + _listName + ": activate");
            },
            beforeStop: function () {
                console.log("list " + _listName + ": beforeStop");
            },
            change: function () {
                console.log("list " + _listName + ": change");
            },
            create: function () {
                console.log("list " + _listName + ": create");
            },
            deactivate: function () {
                console.log("list " + _listName + ": deactivate");
            },
            out: function () {
                console.log("list " + _listName + ": out");
            },
            over: function () {
                console.log("list " + _listName + ": over");
            },
            receive: function () {
                console.log("list " + _listName + ": receive");
            },
            remove: function () {
                console.log("list " + _listName + ": remove");
            },
            sort: function () {
                console.log("list " + _listName + ": sort");
            },
            start: function () {
                console.log("list " + _listName + ": start");
            },
            stop: function () {
                $scope.$apply($scope.rawScreens[0] = angular.copy(screen1Copy));

            },
            update: function () {
                console.log("list " + _listName + ": update");
            }
        };
        return options;
    }

    $scope.sortableOptionsList = [createOptions('A'), createOptions('B'),createOptions('C')];

    $scope.logModels = function () {
        $scope.sortingLog = [];
        for (var i = 0; i < $scope.rawScreens.length; i++) {
            var logEntry = $scope.rawScreens[i].map(function (x) {
                return x.title;
            }).join(', ');
            logEntry = 'container ' + (i + 1) + ': ' + logEntry;
            $scope.sortingLog.push(logEntry);
        }
    };
}).filter("isTpl", function () {
    return function (input) {
        if (input == 1 || input == '1') {
            return "(模板)";
        } else {
            return ""
        }

    };

}).filter("topicFilter", function () {
    return function (input) {
        if (input == 1 || input == '1') {
            return "综合";
        }
        if (input == 2 || input == '2') {
            return "闲聊"
        }
        if (input == 3 || input == '3') {
            return "求助"
        }
        if (input == 4 || input == '4') {
            return "攻略"
        }
        if (input == 5 || input == '5') {
            return "心得"
        }


    };

}).filter("appearanceFilter", function () {
    return function (input) {
        if (input == 0 || input == '0') {
            return "弱";
        }
        if (input == 1 || input == '1') {
            return "中"
        }
        if (input == 2 || input == '2') {
            return "强"
        }


    };

}).directive('ktDateTime', ['$parse','$filter', function ($parse,$filter) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, controller) {
            controller.$formatters.push(function (value) {
                if (angular.isDate(value)) {

                    return $filter('date')(value,"yyyy/mm/dd HH:00:00")
                } else if (angular.isString(value)) {
                    return value;
                } else if (angular.isNumber(value)) {
                    return $filter('date')(new Date(value), "yyyy/mm/dd HH:00:00");
                }
            });

            var getOptions = function () {
                return angular.extend({},  scope.$eval(attrs.ktDateTime));
            };
            var opts = getOptions();
            opts.onSelect = function (value, picker) {
                scope.$apply(function () {
                    controller.$setViewValue($filter('date')(new Date(value), "yyyy/mm/dd HH:00:00"));
                });
            };
            opts.onClose = function (value, picker) {

                scope.$apply(function () {
                    controller.$setViewValue($filter('date')(value, "yyyy/mm/dd HH:00:00"));
                    //                    scope.$parent.editFlag = false;
                });
            };
            if (angular.equals(opts.pickerType, "timePicker")) {
                element.timepicker(opts);
            } else if (angular.equals(opts.pickerType, "dateTimePicker")) {
                element.datetimepicker(opts);
            } else {
                element.datepicker(opts);
            }
        }
    };
}]);
