$(document).ready(function() {
    var MyApp = {};
    MyApp.navBar = $('#list_navBar').html();
    MyApp.navTemplate = Handlebars.compile(MyApp.navBar);
    $('#navBar').html(MyApp.navTemplate());

    MyApp.contentSource = $('#list_content').html();
    MyApp.contentTemplate = Handlebars.compile(MyApp.contentSource);
    $('#content').html(MyApp.contentTemplate());
    $('#editTasks').hide();
    MyApp.createFormSource = $('#create_form').html();
    MyApp.createFormTemplate = Handlebars.compile(MyApp.createFormSource);

    MyApp.updateFormSource = $('#update_form').html();
    MyApp.updateFormTemplate = Handlebars.compile(MyApp.updateFormSource);

    MyApp.tasks = Tasks.showTasks();
    MyApp.currentItem = {};
    /*var tasksPerPages = 3,
        tasksLength = MyApp.tasks.length,
        pages = _.range(Math.ceil(tasksLength / tasksPerPages));
    var _tasks = tasks.slice();
    var tasksList = _tasks.splice(0, tasksPerPages);*/

    $.each(MyApp.tasks, function(index, obj) {
        $('#errorListMsg').hide();
        $('<li id="' + obj.id +'"><a>' + obj.summary + '</a></li>').appendTo('#tasksList ul#task-list');
    });

    $('#createTask, #create').on('click', function() {
        $('#content').html(MyApp.createFormTemplate());
    });

    $('#content').on('click', '#createBtn', function() {
        var data = $('#newTask form').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        data.id = Tasks.generateId();
        Tasks.createTask(data);
        window.location.href = 'home.html';
    });

    $('#tasksList ul#task-list').on('click', 'li', function() {
        MyApp.currentItem = Tasks.updateTask($(this).attr('id'));
        $('#editTasks').show();
        $('#_summary').text(MyApp.currentItem.summary);
        $('#_priority').text(MyApp.currentItem.priority);
        $('#_date').text(MyApp.currentItem.date);
        $('#_description').text(MyApp.currentItem.desc);
        $('#_estimatedTime').text(MyApp.currentItem.est);
    });

    $('#editTask').on('click', function() {
        $('#content').html(MyApp.updateFormTemplate());
        $('#update_summary').val(MyApp.currentItem.summary);
        $('#update_priority').val(MyApp.currentItem.priority);
        $('#update_date').val(MyApp.currentItem.date);
        $('#update_desc').val(MyApp.currentItem.desc);
        $('#update_est').val(MyApp.currentItem.est);
    });

    $('#content').on('click', '#updateBtn', function() {
        MyApp.currentItem.summary = $('#update_summary').val();
        MyApp.currentItem.priority = $('#update_priority').val();
        MyApp.currentItem.date = $('#update_date').val();
        MyApp.currentItem.desc = $('#update_desc').val();
        MyApp.currentItem.est = $('#update_est').val();
        localStorage.setItem('tasks', JSON.stringify(MyApp.tasks));
        window.location.href = 'home.html';
    });

    $('#logout').on('click', function() {
        window.location.href = 'index.html';
    });

    /*searching tasks*/
    $('#query_search').click(function() {
        var query = $('#query').val().toLowerCase();
        $('ul.lead li').each(function() {
            var text = $(this).text().toLowerCase();
            (text.indexOf(query) === 0) ? $(this).show() : $(this).hide();
        });
    });

    /*pagination*/
    /*console.log(tasksLength/tasksPerPages, tasksPerPages, tasksLength, pages);
    $('ul.pagination').append('<li><a href="#">&laquo;</a></li>');
    $.each(pages, function(i) {
        $('<li><a href="#">'+ (i + 1) +'</a></li>').appendTo('ul.pagination');
    });
    $('ul.pagination').append('<li><a href="#">&raquo;</a></li>');

    console.log(tasks);
    $('ul.pagination li').click(function() {
        _tasks = tasks.slice();
        tasksList = _tasks.splice(($(this).index() -1) * tasksPerPages , tasksPerPages);
        console.log(tasksList, tasks);
        *//*$.each(tasksList, function(obj) {
            $('#tasksList ul#task-list').hide();
            $('<li id="' + tasksList[obj].id +'"><a>' + tasksList[obj].summary + '</a></li>').appendTo('#tasksList ul#task-list');
            $('#tasksList ul#task-list').show();
        });*//*
    });*/
});