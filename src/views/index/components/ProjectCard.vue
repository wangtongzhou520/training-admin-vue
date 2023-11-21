<template>
  <el-card class="user-container">
    <!-- 简介 -->
    <div class="project-bio">
      <div class="project-bio-section">
        <div class="project-bio-section-header">
          <svg-icon icon="introduce" />
          <span>项目介绍</span>
        </div>
        <div class="project-bio-section-body">
          <div class="text-muted">
            12他额阿嘎华师大建设大厦更大很尬是噶受打击个很大肯定会撒好的哈手机打击几哈
          </div>
        </div>
      </div>
    </div>
    <!-- 技术栈 -->
    <div class="project-bio-section">
      <div class="project-bio-section-header">
        <svg-icon icon="reward" />
        <span>技术栈</span>
      </div>
      <div class="project-bio-section-body">
        <div class="progress-item">
          <div>1</div>
          <el-progress :percentage="100" status="success" />
          <div>1</div>
          <el-progress :percentage="100" status="success" />
          <div>1</div>
          <el-progress :percentage="100" status="success" />
          <div>1</div>
          <el-progress :percentage="100" status="success" />
          <div>1</div>
          <el-progress :percentage="100" status="success" />
          <div>1</div>
          <el-progress :percentage="100" status="success" />
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup></script>

<style lang="scss" scoped>
.user-container {
  .project-bio {
    margin-top: 20px;
    color: #606266;

    .project-bio-section {
      margin-bottom: 36px;
      .project-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
        span {
          padding-left: 4px;
        }
      }
      .project-bio-section-body {
        .progress-item {
          margin-top: 10px;
          div {
            font-size: 14px;
            margin-bottom: 2px;
          }
        }
      }
    }
  }
}
</style>
