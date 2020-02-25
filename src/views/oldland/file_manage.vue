<template>
    <div>
        <Card>
            <Upload
                    action="http://localhost:17000/v1/file/upload_file"
                    :headers="_headers"
                    name="file"
                    :before-upload="beforeUpload"
                    :on-success="handleSuccess"
                    multiple
            >
                <Button icon="ios-cloud-upload-outline">上传文件</Button>
            </Upload>
            <!-- <Button v-clipboard="copy">复制</Button> -->
            <Table :columns="columns" :data="fileList"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page
                            :total="count"
                            :current="currentPage"
                            @on-page-size-change="changePageSize"
                            @on-change="changePage"
                            show-sizer
                            :page-size="pageSize"
                            :page-size-opts="[5,10,15]"
                    ></Page>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
    import {getFileList, getFile, getFileByGet} from "../../api/file";
    import {encode, downloadFile, downloadFileByFrame} from "@/lib/util.js";
    export default {
        name: "file_page",
        data() {
            return {
                fileList: [],
                _headers: {},
                count: 0,
                file: {},
                pageSize: 5,
                currentPage: 1,
                copyValue: "复制test",
                columns: [
                    {title: "文件索引", key: "key"},
                    {
                        title: "oss链接",
                        key: "oss_url",
                        render: (h, params) => {
                            return h("span", {}, [
                                h(
                                    "i-button",
                                    {
                                        attrs: {
                                            type: "success"
                                        },
                                        directives: [
                                            {
                                                name: "clipboard",
                                                value: {
                                                    value: params.row.oss_name,
                                                    success: () => {
                                                        this.$Message.success("复制成功");
                                                    },
                                                    error: () => {
                                                        this.$Message.error("复制失败");
                                                    }
                                                }
                                            }
                                        ]
                                    },
                                    "复制链接"
                                )
                            ]);
                        }
                    },
                    {
                        title: "oss路径",
                        key: "oss_name",
                        render: (h, params) => {
                            return h("span", {}, [
                                h(
                                    "i-button",
                                    {
                                        attrs: {
                                            type: "success"
                                        },
                                        directives: [
                                            {
                                                name: "clipboard",
                                                value: {
                                                    value: params.row.oss_url,
                                                    success: () => {
                                                        this.$Message.success("复制成功");
                                                    },
                                                    error: () => {
                                                        this.$Message.error("复制失败");
                                                    }
                                                }
                                            }
                                        ]
                                    },
                                    "复制链接"
                                )
                            ]);
                        }
                    },
                    {title: "文件名", key: "file_name"},
                    {title: "文件类型", key: "file_type"},
                    {title: "文件大小", key: "file_size"},
                    {title: "用户ID", key: "user"},
                    {title: "创建时间", key: "created_at"},
                    {
                        title: "操作",
                        key: "handle",
                        render: (h, params) => {
                            return h(
                                "span",
                                {
                                    style: {
                                        display: "inline-flex",
                                        flexDirection: "column",
                                        paddingTop: "4px",
                                        paddingBottom: "4px"
                                    }
                                },
                                [
                                    h(
                                        "i-button",
                                        {
                                            style: {
                                                marginBottom: "4px"
                                            },
                                            on: {
                                                click: this.download.bind(this, params.row.key)
                                            }
                                        },
                                        "下载"
                                    ),
                                    h(
                                        "i-button",
                                        {
                                            attrs: {
                                                type: "success"
                                            },
                                            props: {
                                                disabled: params.row.file_type.split('/')[0] === 'text' ? false : true
                                            },
                                            style: {
                                                marginBottom: "4px"
                                            },
                                            on: {
                                                click: this.readFile.bind(this, params.row.key)
                                            }
                                        },
                                        "预览文件"
                                    ),
                                    h(
                                        "i-button",
                                        {
                                            attrs: {
                                                type: "error"
                                            },
                                            on: {
                                                click: this.deleteFile.bind(this, params.row.key)
                                            }
                                        },
                                        "删除文件"
                                    )
                                ]
                            );
                        }
                    }
                ]
            };
        },
        mounted() {
            getFileList(0, 5).then(res => {
                if (res.err_code === 0) {
                    this.fileList = res.result.fileList;
                    this.count = res.result.count;
                }
            });
        },
        computed: {},
        methods: {
            handleSuccess() {
                this.$Message.success("文件上传成功");
                getFileList((this.currentPage - 1) * this.pageSize, this.pageSize).then(
                    res => {
                        if (res.err_code === 0) {
                            this.fileList = res.result.fileList;
                            this.count = res.result.count;
                        }
                    }
                );
            },
            readFile(key) {

            },
            deleteFile(key) {
                let index = 0;
                for (let i = 0; i < this.fileList.length; i++) {
                    if (this.fileList[i].key === key) {
                        index = i;
                        break;
                    }
                }

                this.fileList.splice(index, 1);
            },

            changePage(page) {
                this.currentPage = page;
                getFileList((page - 1) * this.pageSize, this.pageSize).then(res => {
                    if (res.err_code === 0) {
                        this.fileList = res.result.fileList;
                        this.count = res.result.count;
                    }
                });
            },
            changePageSize(pageSize) {
                this.pageSize = pageSize;
                getFileList((this.currentPage - 1) * this.pageSize, this.pageSize).then(
                    res => {
                        if (res.err_code === 0) {
                            this.fileList = res.result.fileList;
                            this.count = res.result.count;
                        }
                    }
                );
            },
            beforeUpload(file) {
                this.file = file;
            },
            download(key) {
                console.log(key)
                const data = {
                    key: key,
                    type: "download",
                    source: "local"
                };
                getFileByGet(data).then(res => {
                    let fileName = res.dispositon.split(";")[1].split("=")[1];
                    let blob = new Blob([res.data]);
                    var downloadElement = document.createElement("a");
                    var href = window.URL.createObjectURL(blob); //创建下载的链接
                    downloadElement.href = href;
                    downloadElement.download = fileName; //下载后文件名
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); //点击下载
                    document.body.removeChild(downloadElement); //下载完成移除元素
                    window.URL.revokeObjectURL(href); //释放掉blob对象
                });
            }
        },
        created() {
            let data = {
                Authorization: encode()
            };

            this._headers = data;
        }
    };
</script>
<style lang="less">
    div {
        flex-direction: column;
    }
</style>
