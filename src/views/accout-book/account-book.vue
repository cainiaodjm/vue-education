<template>
  <Card>
    <div class="account-book-wrapper">
      <Row :gutter="16">
        <i-col span="8">
          <Row class="select-mouth">
            <i-col span="8"></i-col>
            <i-col span="8"></i-col>
            <i-col span="8"></i-col>
          </Row>
        </i-col>
        <i-col span="16">
          <Card>
            <p slot="title">账单图标</p>
          </Card>
        </i-col>
      </Row>
    </div>
  </Card>
</template>
<script>
export default {
  name: "account-book",
  data: () => {
    return {}
  }
}
</script>
