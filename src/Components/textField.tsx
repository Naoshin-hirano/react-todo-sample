import React from "react";
export const TextField = ({ onSubmit, text, handleChange }: any) => {
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
};
