import React, { useState, useEffect } from "react";
import {
    MDBContainer,
    MDBCol,
    MDBTextArea,
    MDBIcon,
    MDBSpinner,
    MDBRow,
    MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getCommentsOnEvent,
    editComment,
    deleteComment,
} from "../redux/features/postsSlice";
import { toast } from "react-toastify";

const initialState = {
    edited: false,
    commentId: "",
    comment: "",
};

const Comments = () => {

    const [editData, setEditData] = useState(initialState);

    const { user } = useSelector((state) => ({ ...state.auth }));
    const { comments, loading } = useSelector((state) => ({ ...state.posts }));
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getCommentsOnEvent(id));
    }, [id]);

    const handleEdit = (commentId, comment) => {
        setEditData({ edited: true, commentId: commentId, comment: comment });
    };

    const onCommentChange = (e) => {

        let { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const submitEdit = (e) => {

        e.preventDefault();

        if (editData.comment) {
            dispatch(editComment({ editData, toast }));
            dispatch(getCommentsOnEvent(id));
        }
        setEditData(initialState);
    };

    const handleDelete = (commentId) => {

        if (window.confirm("Are you sure you want to delete this comment ?")) {
            dispatch(deleteComment({ commentId, toast }));
        }
    };

    return (

        <MDBContainer className="mb-3 mt-2"
            style={{
                padding: "20px 30px",
                backgroundColor: "#ece9e2",
                borderRadius: "20px",
                width: "80%",
            }}
        >
            <h4 style={{ marginTop: "20px", marginBottom: "40px", borderBottom: "1px solid #606080", textAlign: "left" }}>
                Comments:
            </h4>

            {comments.length === 0 && (
                <p> Sadly, there are no comments for this event yet :( </p>
            )}

            {comments.map((item) => (
                <MDBContainer
                    style={{
                        marginBottom: "20px",
                        width: "90%",
                        padding: "5px",
                        backgroundColor: "#c8ccdf",
                        borderRadius: "10px"
                    }} key={item._id}>
                    <MDBRow style={{
                        margin: "5px 0px",
                    }}>{item.creator} :</MDBRow>
                    <MDBRow>
                        {editData.edited && editData.commentId === item._id ? (
                            <div>
                                <MDBTextArea
                                    type="text"
                                    value={editData.comment}
                                    name="comment"
                                    onChange={onCommentChange}
                                    rows={2}
                                >
                                </MDBTextArea>
                                <MDBBtn style={{ width: "70%", backgroundColor: "#606080" }} className="mt-2" type="submit"
                                    onClick={submitEdit}>
                                    {loading && (
                                        <MDBSpinner
                                            size="sm"
                                            role="status"
                                            tag="span"
                                            className="me-2"
                                        />
                                    )}
                                    Edit comment
                                </MDBBtn>
                                <MDBBtn style={{ width: "30%", color: "#606080", backgroundColor: "#eeeff4" }}
                                    onClick={() => setEditData(initialState)}>
                                    Cancel
                                </MDBBtn>
                            </div>
                        ) : (
                            <MDBCol
                                style={{
                                    padding: "10px",
                                    backgroundColor: "#d5d8e4",
                                    borderRadius: "10px"
                                }}
                            >
                                {item.comment}</MDBCol>
                        )}
                        {user?.result?._id === item.creatorId && !editData.edited && (
                            <div className="d-flex justify-content-end">
                                <MDBBtn tag="a" color="none" style={{ margin: "10px 20px" }}>
                                    <MDBIcon
                                        fas
                                        icon="edit"
                                        style={{ color: "#606080" }}
                                        size="lg"
                                        onClick={() => handleEdit(item._id, item.comment)}
                                    />
                                </MDBBtn>
                                <MDBBtn tag="a" color="none" style={{ margin: "10px 20px" }}>
                                    <MDBIcon
                                        fas
                                        icon="trash"
                                        style={{ color: "#a25349" }}
                                        size="lg"
                                        onClick={() => handleDelete(item._id)}
                                    />
                                </MDBBtn>
                            </div>
                        )}
                    </MDBRow>
                </MDBContainer>
            ))
            }
        </MDBContainer >

    );
};

export default Comments;
