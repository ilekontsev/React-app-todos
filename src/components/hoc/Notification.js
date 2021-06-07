import { PureComponent } from "react";
export const HOC = (color, component) => {
    class Notification extends PureComponent {
        render() {
            const Notify = component
            return <div  style={{backgroundColor: color}}>
                <Notify />
            </div>
        }
    }
    return Notification
}
