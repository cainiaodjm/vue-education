<template>
  <div>
    <Row :gutter="16">
      <Col span="12" >
      <Card>
         <p slot="title">非render写法</p>
        <anchor :level="1" title="这是1级标签" >
          这是1级标签
        </anchor>
        <anchor :level="2" title="这是2级标签" >
          这是2级标签
        </anchor>
        <anchor :level="3" title="这是3级标签" >
          这是3级标签
        </anchor>
      </Card>
     
      </Col>
      <Col span="12">
      <Card>
        <p slot="title">render写法</p>
        <anchor2 :level="1" title="这是1级标签" >
          这是1级标签
        </anchor2>
        <anchor2 :level="2" title="这是2级标签" >
          这是2级标签
        </anchor2>
        <anchor2 :level="3" title="这是3级标签" >
          这是3级标签
        </anchor2>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import Anchor from './anchor'
import Anchor2 from './anchor2.js'
export default {
  name: "demo1",
  components:{
    Anchor,
    Anchor2
  }
};
</script>
