import React, { useState, useEffect } from 'react'
import { Steps, Button, message, Form, Input, Select, notification, PageHeader } from 'antd'
import axios from 'axios'
import WriteNews from '../WriteNews'
import draftToMarkdown from 'draftjs-to-markdown';
import { convertToRaw, ContentState, EditorState } from 'draft-js';
import MarkdownIt from 'markdown-it';
import PreviewNews from '../PreviewNews'
import { useNavigate, useParams } from 'react-router-dom'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const md = new MarkdownIt();

const { Step } = Steps
const { Option } = Select

export default function Index() {

    const [current, setCurrent] = useState(0)
    const [basicInfoForm] = Form.useForm()
    const [categories, setCategories] = useState([])
    const [news, setNews] = useState(null)
    const [content, setContent] = useState(EditorState.createEmpty())
    const [markdown, setMarkdown] = useState('')
    const token = JSON.parse(localStorage.getItem('token'))
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        axios.get(`/news/${id}?_expand=category&_expand=role`).then(res => {
            setNews(res.data)
            basicInfoForm.setFieldsValue({
                title: res.data.title,
                categoryId: res.data.categoryId
            })
            const contentBlock = htmlToDraft(res.data.content)
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                setContent(editorState)
            }
        })
    }, [])

    const openNotification = (placement, message, title = '保存新闻') => {
        notification.info({
            message: title,
            description: message,
            placement,
        });
    };

    useEffect(() => {
        axios.get('/categories').then(res => {
            setCategories(res.data)
        })
    }, [])

    const onContentChange = (contentState) => {
        setContent(contentState)
        const rawContentState = convertToRaw(contentState.getCurrentContent());
        const markup = draftToHtml(rawContentState);
        // const markdown = md.render(markup)
        setMarkdown(markup)
    }

    const steps = [
        {
            title: '文章信息',
            desc: '文章标题，文章分类',
            content: <Form
                style={{ marginTop: '20px' }}
                name="basic"
                form={basicInfoForm}
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    label="新闻标题"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: '请输入新闻标题!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="新闻分类"
                    name="categoryId"
                    rules={[
                        {
                            required: true,
                            message: '请输入新闻分类!',
                        },
                    ]}
                >
                    <Select>
                        {
                            categories.map(item => {
                                return <Option key={item.id} value={item.id}>{item.title}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
            </Form>,
        },
        {
            title: '文章主题',
            desc: '文章主体内容',
            content: <WriteNews content={content || null} onChange={onContentChange}></WriteNews>,
        },
        {
            title: '文章提交',
            desc: '保存草稿或者提交审核',
            content: <PreviewNews markdown={markdown}></PreviewNews>,
        },
    ];

    const next = () => {
        if (current === 0) {
            basicInfoForm.validateFields().then(values => {
                // basicInfoForm.resetFields()
                setNews({ ...news, ...values })
                setCurrent(current + 1);
            }).catch((info) => {
                console.log('Validate Failed:', info);
            });
        } else if (current === 1) {
            if (!markdown) {
                message.error('新闻内容不能为空')
            } else {
                setCurrent(current + 1)
            }
        }
    };

    const handleDraft = (verifyState) => {
        const title = verifyState ? '提交审核' : '保存草稿'
        const path = verifyState ? '/mgmt/verify-manage/list' : '/mgmt/news-manage/draft'
        axios.patch(`/news/${id}`, {
            ...news,
            content: markdown,
            verifyState: verifyState,
        }).then(res => {
            openNotification('bottomRight', res.status, title)
            navigate(path, { replace: true })
        })
    }

    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <>
            {news && <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={news.title}
                subTitle={news.category.title}
            >
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} description={item.desc} />
                    ))}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
                <div className="steps-action">
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            下一步
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <span>
                            <Button type="primary" onClick={() => handleDraft(0)}>
                                保存草稿箱
                            </Button>
                            <Button style={{ marginLeft: '8px' }} type="danger" onClick={() => handleDraft(1)}>
                                提交审核
                            </Button>
                        </span>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            上一步
                        </Button>
                    )}
                </div>
            </PageHeader>}
        </>
    );
}

