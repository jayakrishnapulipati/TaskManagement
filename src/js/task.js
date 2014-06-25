var Tasks = (function() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [],
    generateId = function() {
        return tasks.length + 1;
    },
    newTask = function(data) {
        tasks.push(data);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    },
    editTask = function(value) {
        return _.find(tasks, function(obj) {
            return obj.id === parseInt(value, 10);
        });
    },
    getTasks = function() {
        if(tasks === [])
            $('#errorListMsg').show();
        return tasks;
    }; // End var

    return {
        createTask: newTask,
        updateTask: editTask,
        showTasks: getTasks,
        generateId: generateId
    };
})();