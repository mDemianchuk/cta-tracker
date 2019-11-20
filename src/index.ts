var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function (id: string) {
        var parentElement: Element = document.getElementById(id)!;
        var listeningElement: Element = parentElement.querySelector('.listening')!;
        var receivedElement: Element = parentElement.querySelector('.received')!;

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();