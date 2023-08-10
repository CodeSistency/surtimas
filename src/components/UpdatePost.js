import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import Editor from "./Editor";

const UpdatePost = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const {id} = useParams()

    const [data, setData] = useState({})
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [cover,setCover] = useState('');

    

        const handleSubmit = async () => {

            let isMounted = true;
            const controller = new AbortController();

            try {
                const response = await axiosPrivate.put('posts',
                JSON.stringify({ title, summary, content, cover }),
            
            {
                    signal: controller.signal
                });
                console.log(JSON.stringify(response?.data));
                isMounted && setData(response.data);
                navigate(from, { replace: true });
            } catch (err) {
                console.error(err);
                // navigate('/login', { state: { from: location }, replace: true });
                
            }

            return () => {
                isMounted = false;
                controller.abort();
            }
        }

        

        
   

    return (
        <form onSubmit={handleSubmit}>
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
    <input type="text"
             placeholder={'Cover'}
             value={cover}
             onChange={ev => setCover(ev.target.value)} />
      <Editor value={content} onChange={setContent} />
      <button style={{marginTop:'5px'}}>Update post {id}</button>
    </form>
    );
};

export default UpdatePost;