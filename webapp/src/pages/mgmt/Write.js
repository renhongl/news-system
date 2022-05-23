import React from 'react'
import CreateNews from '../../components/CreateNews'
import { PageHeader } from 'antd'

export default function Write() {
  return (
    <section>
      <PageHeader
            className="site-page-header"
            title="撰写文章"
            subTitle="简单几部即可发表文章"
        />
        <CreateNews></CreateNews>
    </section>
  )
}
