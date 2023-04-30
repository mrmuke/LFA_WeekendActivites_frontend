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
    align-items:center;
    display: flex;
    min-height: 100vh;
    width: 100%;
    background-position: 50% 50%;
}
.background-text{
    color:white;
    font-size:30px;
    position:relative;
    left:50%;
    transform:translateX(-50%);
}
@media (max-width: 650px){
    .background-text{
        font-size:20px;
    }
}

@media(max-width: 385px){
    .background-text{
        font-size:14px;
    }
}
</style>