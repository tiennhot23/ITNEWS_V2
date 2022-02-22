import React, { useState } from "react"
import { addFeedback } from "../../utils/callerAPI"
import { toastError, toastSuccess } from "../../Toast/Toast"
import { Link } from "react-router-dom"

const Feedback = () => {
    const [feedback, setFeedback] = useState({
        subject: "",
        content: "",
    })

    const handleChange = (event) => {
        setFeedback({
            ...feedback,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const feedBack = await addFeedback(feedback)
            if (feedBack.status === 201) {
                toastSuccess(feedBack.message)
            } else {
                toastError(feedBack.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const { subject, content } = feedback
    return (
        <>
            <div className="wapper">
                <div className="content">
                    <Link to="/">
                        {" "}
                        <header className="img-logo"></header>
                    </Link>
                    <div className="login-content">
                        <div className="bia-login" />
                        <form className="box-feedback" onSubmit={handleSubmit}>
                            <h2>Phản hồi với chúng tôi</h2>
                            <div id="input1">
                                <label
                                    htmlFor="feedback-input1"
                                    className="item-lable"
                                >
                                    <i className="fas fa-heading fa-lg">
                                        &nbsp;
                                    </i>
                                </label>
                                <input
                                    type="text"
                                    className="item-input"
                                    id="feedback-input1"
                                    placeholder="Tiêu đề"
                                    name="subject"
                                    value={subject}
                                    onChange={handleChange}
                                />
                            </div>
                            <div id="input2">
                                <label
                                    htmlFor="feedback-input2"
                                    className="item-lable"
                                >
                                    <i className="fas fa-paper-plane fa-lg">
                                        &nbsp;
                                    </i>
                                </label>
                                <textarea
                                    type="text"
                                    className="item-input"
                                    style={{ height: "70%" }}
                                    id="feedback-input2"
                                    placeholder="Nội dung phản hồi........."
                                    name="content"
                                    value={content}
                                    onChange={handleChange}
                                />
                            </div>
                            <button id="feedback" type="submit">
                                Phản hồi
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feedback
