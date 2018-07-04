
// ObjectWatcher by Mevedia
// https://mevedia.com

function ObjectWatcher() {


    this.groups = [];

    this.element = document.createElement('div');
    this.element.className = 'stats';


    document.body.appendChild(this.element);


    const css = `
    .stats > div > div > div > div {
      flex-grow: 1;
      flex-basis: 50%;
      margin: 0 15px;
      text-align: right;
    }
    .stats .label {
      text-align: left;
    }
    .stats {
      position: fixed;
      right: 1em;
      top: 1em;
      background-color: rgba(65,65,66,0.99);
      color: #d4d4d4;
      padding: 5px;
      z-index: 1000;
    }
    .stats > div > div {
      display: flex;
      flex-direction: column;
    }
    .stats > div > div > div {
      display: flex;
      margin: 2px 0;
    }
    .stats > div:not(:first-child) {
      border-top: 1px dashed gray;
      padding-top: 0.5em;
      margin-top: 0.5em;
    }
    .stats > div {
      margin: 4px;
      display: flex;
      flex-direction: column;
    }`;


    const head = document.head || document.getElementsByTagName('head')[0];

    const element = file.element || document.createElement('style');
    element.appendChild(document.createTextNode(css));

    head.insertBefore(element, head.firstChild);

}

ObjectWatcher.prototype = {


    decimal: 2,
    interval: 10,
    frame: 0,



    place: function(position, size) {

        size = size || '1em';

        const style = this.element.style;

        switch ( position ) {
            case 'topLeft':

                style.left = size;
                style.top = size;
                style.right = 'initial';
                style.bottom = 'initial';

                break;
            case 'topRight':

                style.left = 'initial';
                style.top = size;
                style.right = size;
                style.bottom = 'initial';

                break;
            case 'bottomLeft':

                style.left = size;
                style.top = 'initial';
                style.right = 'initial';
                style.bottom = size;

                break;
            case 'bottomRight':

                style.left = 'initial';
                style.top = 'initial';
                style.right = size;
                style.bottom = size;

                break;
        }

    },

    add: function(name, object) {

        const group = {
            name: name,
            target: object,
            element: document.createElement('div'),
            head: document.createElement('b'),
            body: document.createElement('div'),
            fields: []
        };

        group.head.textContent = group.name;

        group.element.appendChild(group.head);
        group.element.appendChild(group.body);


        for ( let name in object ) {

            const value = object[name];


            switch ( typeof value ) {
                case 'string':
                case 'array':
                case 'object':

                    continue;

            }


            const field = {
                name: name,
                value: ( value - Math.floor(value) > 0 ) ? value.toFixed(this.decimal) : value,

                container: document.createElement('div'),
                label: document.createElement('div'),
                content: document.createElement('div')
            };

            field.label.textContent = name;
            field.label.className = 'label';


            field.container.appendChild(field.label);
            field.container.appendChild(field.content);



            group.fields.push(field);

            group.body.appendChild(field.container);

        }

        this.element.appendChild(group.element);



        this.groups.push(group);

    },

    remove: function(name) {

        for ( let i = 0, l = this.groups.length; i < l; i ++ ) {

            const group = this.groups[i];


            if ( group.name === name ) {

                this.element.removeChild(group.element);

                group.element = null;
                group.body = null;
                group.head = null;


                for ( let i = 0, l = group.fields.length; i < l; i ++ ) {

                    const field = group.fields[i];

                    field.content = null;
                    field.label = null;
                    field.container = null;

                }


                this.groups.splice(i, 1);

                break;

            }

        }

    },

    update: function() {

        this.frame ++ ;

        if ( this.frame > this.interval ) {

            this.frame = 0;


            for ( let i = 0, l = this.groups.length; i < l; i ++ ) {

                const group = this.groups[i];


                for ( let i = 0, l = group.fields.length; i < l; i ++ ) {

                    const field = group.fields[i];
                    const value = group.target[field.name];


                    if ( field.value !== value ) {

                        field.value = value;

                        field.content.textContent = ( value - Math.floor(value) > 0 ) ? value.toFixed(this.decimal) : value;

                    }


                }


            }
        }



    }

};
