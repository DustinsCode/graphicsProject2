import {MeshPhongMaterial, Mesh, Group, BoxGeometry, Vector3, EllipseCurve, Curve} from 'three'

let path = new EllipseCurve(0, 0, 10, 5, 0, 2*Math.PI, true, 0);
let normal = new Vector3(0, 1, 0);
let pointOnPath = .5;
let tangent = 0;
let axis = new Vector3();
let radians = 0;
let reclinerMesh;

export default class Chair {

    constructor () {
        const chair = new Group();

        // Seat of chair
        const seat = new BoxGeometry(20, 20, 20, 4, 4, 4);
        const seatMat = new MeshPhongMaterial({color: 0x8c6900});
        this.seatMesh = new Mesh(seat, seatMat);

        // Backrest of chair
        const backrest = new BoxGeometry(10, 40, 20, 4, 4, 4);
        const backrestMat = new MeshPhongMaterial({color: 0x8c6900});
        this.backrestMesh = new Mesh(backrest, backrestMat);
        this.backrestMesh.translateX(10);
        this.backrestMesh.translateY(10);

        // Recliner of chair
        const recliner = new BoxGeometry(5, 20, 20, 4, 4, 4);
        const reclinerMat = new MeshPhongMaterial({color: 0x8c6900});
        reclinerMesh = new Mesh(recliner, reclinerMat);
        reclinerMesh.translateX(-13);


        chair.add(this.seatMesh, this.backrestMesh, reclinerMesh);

        requestAnimationFrame(this.moveFootRest);

        return chair;
    }

    /***
     * Moves the footrest with quaternions along a set path
     */
    moveFootRest(){
        let point = path.getPoint(pointOnPath);
        reclinerMesh.position.set(point.x, point.y, point.z);
        tangent = path.getTangent(pointOnPath).normalize();
        axis.crossVectors(normal, tangent).normalize();
        radians = Math.acos(normal.dot(tangent));
        reclinerMesh.quaternion.setFromAxisAngle(axis, radians);
        pointOnPath = (pointOnPath >= 1) ? 2 : pointOnPath += 0.02;
        console.log(pointOnPath);

        if (pointOnPath < 1) {
            requestAnimationFrame(this.moveFootRest);
        }
    }
}