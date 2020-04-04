<template>
  <Card>
    <div class="account-book-wrapper">
      <Row :gutter="16">
        <i-col span="8">
          <Row class-name="display">
            <i-col span="8" class-name="display-select-time">
              <DatePicker format="yyyy-MM" type="month">
                <div :style="{ cursor: 'pointer' }">
                  <span class="display-select-time-label">2</span>
                  <span class="display-select-time-content">
                    月
                    <Icon type="ios-arrow-down" :size="16" />
                  </span>
                </div>
              </DatePicker>
            </i-col>
            <i-col span="8" class-name="display-account">
              <span class="display-account-label">支出</span>
              <span class="display-account-content">1</span>
            </i-col>
            <i-col span="8" class-name="display-account">
              <span class="display-account-label">支出</span>
              <span class="display-account-content">2</span>
            </i-col>
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
    return {
      bill: {
        type: 0,
        amount: 0
      },
      selectedCategory: null,
      //数据集缓存
      bills: [],
      categroyies: []
    }
  }
}
</script>
<style lang="less"></style>
