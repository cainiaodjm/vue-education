<template>
    <Card>
        <div style="width: 400px;height: 400px;border: 1px solid #ccc">
            <split>
                <div slot="left" class="demo-split-pane">
                    Left Pane
                </div>
                <div slot="right" class="demo-split-pane">
                    Right Pane
                </div>
            </split>
        </div>

    </Card>
</template>
<script type="text/ecmascript-6">
    import Split from '@/components/split'
    export default {
        components:{
            Split
        }
    }
</script>
