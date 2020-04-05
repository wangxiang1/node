import React from 'react'

const { Provider, Consumer } = React.createContext()

function Child(props) {
    return (
        <div onClick={() => props.add()} >{props.counter}</div>
    )
}

export default class Context extends React.Component {
    state = {
        counter: 0
    }

    add = () => {
        this.setState({
            counter: this.state.counter + 1
        })
    }

    render() {
        return (
            <Provider value={{ counter: this.state.counter, add: this.add }}>
                <Consumer>
                    {value => <Child {...value} />}
                </Consumer>
                <Consumer>
                    {value => <Child {...value} />}
                </Consumer>
                <Consumer>
                    {value => <Child {...value} />}
                </Consumer>
            </Provider>
        )
    }
}