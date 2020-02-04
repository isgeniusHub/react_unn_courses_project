import React from 'react';
import { Link } from "react-router-dom";

export default function ContentBlock(props){
    return (
        <div>
            <h2>{ props.title }</h2>
            <div>
                {
                   props.items.map((item,i) => {console.log(props.href)
                        return(
                            <div key={i}>
                                <h3>
                                    <Link to={ props.href + "/" +  ( (item.articleId) ?  item.articleId : item.userId ) }>
                                        { item.name || item.title }
                                    </Link>
                                </h3>
                                <p>{ item.email || item.text }</p>
                            </div>
                        )
                    })
                }
            </div>
            <Link to={ props.href } className="btn-block">
                <button>Перейти в раздел</button>
            </Link>
        </div>
    );
}
