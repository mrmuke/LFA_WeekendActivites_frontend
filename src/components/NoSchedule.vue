<template>
    <div class="background">
        <div class="background-text">There is no schedule at the moment!</div>
    </div>
</template>
<style>
.background{
    overflow-y: hidden;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(/img/background-wave.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    justify-content: center;
    align-items:center;
    display: flex;
    min-height: 100vh;
    width: 100%;
    background-position: 50% 50%;
}
.background-text{
    color:white;
    font-size:30px;
    position:absolute;
    top:55%;
    left:50%;
    transform:translate(-50%, -50%);
}
</style>