import { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStarts } from "../helper";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ReactMarkdown from 'react-markdown';

const Answer = ({ ans, totalResult, index, type }) => {

    const [heading, setHeading] = useState(false);
    const [answer, setAnswer] = useState(ans);
    useEffect(() => {
        if (ans, checkHeading(ans)) {
            setHeading(true)
            setAnswer(replaceHeadingStarts(ans))
        };
    }, [])

    const renderer = {
        code({ node, inline, className, children, ...props }) {
            const math = /language-(\W+)/.exec(className || '')
            return !inline && math ? (
                <SyntaxHighlighter
                    {...props}
                    children={String(children).replace(/\n$/, '')}
                    language={matchMedia[1]}
                    style={dark}
                    PreTag="div" />
            ) : (
                <code {...props} className={className}>
                    {children}
                </code>
            )
        }
    }

    return (
        <>
            {
                index == 0 && totalResult > 1 ? <span className="pt-2 text-xl block dark:text-white">{answer}</span> :
                    heading ? <span className={index == 0 ? "text-3xl" : "pt-2 text-lg block dark:text-white"}>{answer}</span> : <span className={type == 'q' ? 'pl-1' : 'pl-5'}>
                        <ReactMarkdown components={renderer}>{answer}</ReactMarkdown>
                    </span>
            }
        </>
    )
}
export default Answer