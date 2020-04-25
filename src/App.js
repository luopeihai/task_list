import React, { Fragment } from "react";
import "./app.scss";

import { Input, Icon, Message, Button, Checkbox } from "antd";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [
        { value: "hello", isClear: false },
        { value: "world", isClear: false },
      ], //select value
      clearList: [], //clear list
      inputValue: null, //input value
    };
  }

  //add task
  handleAddOption = () => {
    const { inputValue, list } = this.state;

    if (inputValue === null) {
      Message.error("Please input");
      return;
    }

    if (list.findIndex((item) => item.value === inputValue) !== -1) {
      Message.error("It already exists");
    } else {
      list.push({ value: inputValue, isClear: false });
      this.setState({
        list,
      });
    }
  };

  //deleted value
  handleDeleted = (index) => {
    const { list } = this.state;

    list.splice(index, 1);
    this.setState({
      list,
    });
  };

  //check box
  handleChange = (e, index) => {
    const { clearList } = this.state;
    //is checked
    if (e.target.checked) {
      clearList.push(index);
    } else {
      clearList.splice(clearList.indexOf(index), 1);
    }
    this.setState({
      clearList,
    });
  };

  //clear check task
  handleClear = () => {
    const { list, clearList } = this.state;

    if (clearList.length === 10) {
      Message.error("Please check");
      return;
    }

    this.setState({
      list: list.map((item, index) => {
        if (clearList.indexOf(index) !== -1) {
          item.isClear = true;
        }
        return item;
      }),
    });
  };

  render() {
    const { list } = this.state;

    return (
      <div className="app-page">
        <div className="app-form">
          <div className="form-row">
            <Input
              onChange={(e) => this.setState({ inputValue: e.target.value })}
              addonAfter={
                <Icon type="plus" onClick={() => this.handleAddOption()} />
              }
              placeholder="new task"
            />
          </div>
          <div className="form-row">
            {list.length > 0 && (
              <Fragment>
                <ul>
                  {list.map((item, index) => (
                    <li key={index}>
                      <Icon
                        onClick={() => this.handleDeleted(index)}
                        className="icon"
                        deleted-index={index}
                        type="close"
                      ></Icon>
                      <Checkbox
                        onChange={(e) => this.handleChange(e, index)}
                        checked-value={item.value}
                      >
                        <span className={item.isClear ? "clear" : ""}>
                          {item.value}
                        </span>
                      </Checkbox>
                    </li>
                  ))}
                </ul>
                <div className="clear-box">
                  <Button onClick={() => this.handleClear()}>clear</Button>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}
