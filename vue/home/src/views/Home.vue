/*
 * MIT License
 *
 * Copyright (c) 2017 SmartestEE Co,Ltd..
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Revision History:
 *     Initial: 2017/07/27        Feng Yifei
 */

<template>
  <div>
    <!-- Menu -->
    <el-menu mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">SmartestEE</el-menu-item>
      <el-submenu index="2">
        <template slot="title">解决方案</template>
        <el-menu-item index="2-1">一揽子</el-menu-item>
        <el-menu-item index="2-2">手机 App 开发</el-menu-item>
        <el-menu-item index="2-3">服务号开发</el-menu-item>
        <el-menu-item index="2-4">小程序开发</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">博客</el-menu-item>
      <el-menu-item index="4">团队介绍</el-menu-item>
      <el-menu-item index="5">Github</el-menu-item>
    </el-menu>
    <br />
    <!-- Carousel -->
    <el-carousel indicator-position='outside' :interval='2000' type='card' height='480px'>
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>

    <br />
    
    <!-- Sub-Content -->
    <div style='padding: 8px;'>
      <el-row>
        <el-col :span='6' v-for='(o, index) in 3' :key='o' :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img src='http://element.eleme.io/static/hamburger.50e4091.png' class='image'>
            <div style='padding: 14px;'>
              <span>Yummy hamburger</span>
              <div class='bottom clearfix'>
                <time class='time'>{{ currentDate }}</time>
                <el-button type='text' class='button'>Operating button</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <br />

    <!-- Footer -->
    <el-row>
      <el-col :span="4">
        <h4>xxxx</h4>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
      </el-col>
      <el-col :span="4">
        <h4>xxxx</h4>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
      </el-col>
      <el-col :span="4">
        <h4>xxxx</h4>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
      </el-col>
      <el-col :span="4">
        <h4>xxxx</h4>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
        <p>xxxxxxxx</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        currentDate: new Date(),
      };
    },
  };
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }
</style>
