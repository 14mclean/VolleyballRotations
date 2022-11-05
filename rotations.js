class Player {
    constructor(element, position) {
        this.element = element;
        this.position = position;

        this.test = {
            "Setter":  [[2, -3],[18.4, 42],[18.4, 42],[25.5, 39.5],[23.6, 25],[5, 25]],
            "Middle":  [[2, -3],[21, 42],[21, 42],[21, 42],[23.6, 4],[21, 4]],
            "Outside": [[2, -3],[16.5, 39.5],[23.6, 42],[23.6, 42],[37, 25],[21,25]]
        }

        fetch('./positions.json')
            .then((response) => response.json())
            .then((json) => this.positions = json);
    }

    move_to(coords) {
        this.element.style.transform = "translate(" + coords[0] + "vmin, " + coords[1] + "vmin)";
    }

    set_role(role) {
        this.role = role;
        switch(role) {
            case "Setter":
                this.element.style.content = "S";
                break;
            case "Middle":
                this.element.style.content = "M";
                break;
            case "Outside":
                this.element.style.content = "OH";
                break;
            case "Opposite":
                this.element.style.content = "Op";
                break;
            case "Libero":
                this.element.style.content = "L";
                this.element.style.backgroundColor = "lightcoral";
                break;
            default:

        }
        this.update_position();
    }

    set_position(position) {
        this.position = position;
        this.update_position();
    }

    rotate() {
        if(this.position == 1) {
            this.set_position(6);

        } else {
            this.set_position(this.position-1);
        }
    }

    back_rotate() {
        if(this.position == 6) {
            this.set_position(1);

        } else {
            this.set_position(this.position+1);
        }
    }

    update_position() {
        this.move_to(this.test[this.role][this.position-1]);
    }
}

const team1 = [];
const pos = ["Outside", "Setter", "Middle", "Outside", "Setter", "Middle"];

let team1_elements = document.querySelectorAll(".team1");
for(let i = 0; i < 6; i++) {
    team1.push(
        new Player(team1_elements[i], i+1)
    );
    team1[team1.length-1].set_role(pos[i]);
}
team1_elements=null;


function rotate() {
    team1.forEach(player => {
        player.rotate();
    });
}

function reverse_rotate() {
    team1.forEach(player => {
        player.back_rotate();
    });
}