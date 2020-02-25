<template>
    <Card>
        <Row :gutter="16">
            <Col span="12">
                <Card dis-hover>
                    <Alert type="error">在 IE9+、Safari 和 Firefox 中，outerWidth 和 outerHeight 返回浏览器窗口本身的尺寸.
                        而 innerWidth 和 innerHeight 则表示该容器中页面视图区的大小(减去边框宽度)。在 Chrome 中，outerWidth、outerHeight 与 innerWidth、innerHeight 返回相同的值，即视口(viewport)大小而非浏览器窗口大小
                    </Alert>
                    <Alert type="error">
                        但实际测出来Chrome outerWidth 和 outerHeight 是返回浏览器本身的尺寸
                    </Alert>
                    <Button type="primary" @click="m1" style="margin-right: 16px">获取浏览器本身的尺寸</Button>
                    <Button type="primary" @click="m2">获取视口大小</Button>
                    <Alert type="error" style="margin-top: 16px">
                        在 IE、Firefox、Safari、Opera 和 Chrome 中，document.documentElement.clientWidth 和 document.documentElement.clientHeight 中保存了页面视口的信息
                    </Alert>
                    <Button type="primary" @click="m3" >获取视口大小(2)</Button>
                    <br/>
                    <Alert style="margin-top: 16px">window.open("http://www.wrox.com/","wroxWindow",
                        "height=400,width=400,top=10,left=10,resizable=yes");
                        这行代码会打开一个新的可以调整大小的窗口，窗口初始大小为 400×400 像素，并且距屏幕上沿 和左边各 10 像素。</Alert>
                    <Button type="primary" @click="w1" style="margin-top: 16px">导航和打开窗口</Button>
                </Card>
            </Col>
            <Col span="12">
                <Card dis-hover>

                </Card>
            </Col>
        </Row>
        <br>
        <Row>
            <Col span="8">
                <Card>

                </Card>
            </Col>
            <Col span="8">col-8</Col>
            <Col span="8">col-8</Col>
        </Row>
        <br>
        <Row>
            <Col span="6">col-6</Col>
            <Col span="6">col-6</Col>
            <Col span="6">col-6</Col>
            <Col span="6">col-6</Col>
        </Row>
    </Card>
</template>
<script>
    export default {
        methods: {
            m1() {
                var pageWidth = window.outerWidth
                var pageHeight = window.outerHeight
                var message=`窗口宽度为${pageWidth},窗口高度为${pageHeight}`

                this.$Message.info(message)
            },
            m2() {
                var pageWidth = window.innerWidth
                var pageHeight = window.innerHeight
                var message=`视口宽度为${pageWidth},视口高度为${pageHeight}`

                this.$Message.info(message)
            },
            m3(){
                const viewWidth=document.documentElement.clientWidth
                const viewHeight=document.documentElement.clientHeight
                const message=`视口宽度为${viewWidth},视口高度为${viewHeight}`
                this.$Message.info(message)
                console.log(document.compatMode);
            },
            m4(){
                let pageWidth=window.innerWidth
                let pageHeight=window.innerHeight
                if(typeof pageWidth !="number"){
                    if(document.compatMode == 'CSS1Compat'){
                        pageWidth=document.documentElement.clientWidth;
                        pageHeight=document.documentElement.clientHeight
                    }else{
                        pageWidth=document.body.clientWidth;
                        pageHeight=document.body.clientHeight
                    }
                }
                const message=`视口宽度为${pageWidth},视口高度为${pageHeight}`
                this.$Message.info(message)

            },
            w1(){
                console.log(window.location.origin);
                this.$router.push()
                // window.open("www.baidu.com","_blank","height=400,height=400,width=400,top=10,left=10,resizable=yes")
            }

        },
        mounted() {

        }
    }
</script>
<style lang="less">

</style>
