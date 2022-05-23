import React, { useEffect, useState } from 'react'
import { Button, Descriptions, PageHeader, Row, Statistic, Tag } from 'antd'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Preview from '../PreviewNews'

export default function Index() {

    const { id } = useParams()
    const [news, setNews] = useState(null)
    const verifyList = ['未审核', '审核中', '已通过', '未通过']
    const publishList = ['未发布', '待发布', '已上线', '已下线']
    const colorState = ['', 'orange', 'green', 'red', 'blue']

    useEffect(() => {
        axios.get(`/news/${id}?_expand=category&_expand=role`).then(res => {
            setNews(res.data)
        })
    }, [])

    return (
        <>
            {news && <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={news.title}
                subTitle={news.category.title}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="创建者">{news.author}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">
                        {new Date(news.createTime).toLocaleDateString() + ' ' + new Date(news.createTime).toLocaleTimeString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="发布时间">{news.publishTime ? new Date(news.createTime).toLocaleDateString() + ' ' + new Date(news.createTime).toLocaleTimeString() : '-'}</Descriptions.Item>
                    <Descriptions.Item label="区域">{news.region}</Descriptions.Item>
                    <Descriptions.Item label="审核状态">
                        <span style={{ color: colorState[news.verifyState] }}>{verifyList[news.verifyState]}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="发布状态">
                        <span style={{ color: colorState[news.publishState] }}>{publishList[news.publishState]}</span>
                    </Descriptions.Item>
                </Descriptions>
                <Row>
                    <Statistic
                        title="访问数量"
                        value={news.view}
                    />
                    <Statistic style={{
                        margin: '0 32px',
                    }} title="点赞数量" value={news.star} />
                    <Statistic style={{
                        margin: '0 32px',
                    }} title="评论数量" value={news.star} />
                </Row>
            </PageHeader>}
            <br />
            {
                news && <Preview markdown={news.content}></Preview>
            }
        </>
    )
}
