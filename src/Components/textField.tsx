import React, { FormEvent, memo } from "react";
import { HandleChangeModel } from "../App";

interface TextFieldModel {
    onSubmit: (
        event:
            | React.MouseEvent<HTMLDivElement, MouseEvent>
            | FormEvent<HTMLFormElement>
    ) => void;
    text: string;
    handleChange: HandleChangeModel;
}
export const TextField = memo(
    ({ onSubmit, text, handleChange }: TextFieldModel) => {
        console.log("Textfield");
        return (
            <>
                <form id="js-form" onSubmit={onSubmit}>
                    <input
                        id="js-form-input"
                        className="new-todo"
                        type="text"
                        placeholder="What need to be done?"
                        autoComplete="off"
                        value={text}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                </form>
                <div id="keep-btn" onClick={onSubmit}>
                    保存
                </div>
            </>
        );
    }
);
