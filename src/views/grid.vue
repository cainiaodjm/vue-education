<template>
	<div class="grid">
		<Row>
			<Col></Col>
		</Row>
		<Row :gutter="16">
			<Col span="6">1</Col>
			<Col span="6">2</Col>
			<Col span="6">3</Col>
			<Col span="6">4</Col>
		</Row>
		<Row :gutter="8">
			<Col span="12"></Col>
			<Col span="12"></Col>
		</Row>
		<Row :gutter="16">
			<Col span="8"></Col>
			<Col span="8" push="2"></Col>
		</Row>
		<Row :gutter="16" class="blue">
			<Col :md="6" :xs="24" :sm="12" ></Col>
			<Col :md="6" :xs="24" :sm="12"></Col>
			<Col :md="6" :xs="24" :sm="12"></Col>
			<Col :md="6" :xs="24" :sm="12"></Col>
		</Row>
	</div>
</template>
<script>
	
</script>
<style lang="less">
.grid{
	.ivu-col{
		height: 50px;
		background-color: pink;
		margin-top: 10px;
		background-clip: content-box;
	}
	.blue{
		.ivu-col{
			background-color: blue;
			background-clip: content-box;
			margin-top: 10px;
			height: 50px;
		}
	}
}
</style>

