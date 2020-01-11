async function endingFireworks() {

}

function preBeatFirework() {
    const blastRadius = Math.round(Math.random() * 15) + 15
    const particles = Math.round(Math.random() * 30) + 30
    const circles = Math.round(Math.random() * 3) + 4
    const color = Math.round(Math.random() * 7)
    createFirework(blastRadius, particles, circles, color, null,null,null,null,true,false)
}

function offBeatFirework() {
    const blastRadius = Math.round(Math.random() * 25) + 25
    const particles = Math.round(Math.random() * 50) + 50
    const circles = Math.round(Math.random() * 4) + 4
    const color = Math.round(Math.random() * 7)
    createFirework(blastRadius, particles, circles, color, null,null,null,null,true,false)
}

function mainBeatFirework() {
    const blastRadius = Math.round(Math.random() * 100) + 50
    const particles = Math.round(Math.random() * 350) + 100
    const circles = Math.round(Math.random() * 8) + 4
    const color = Math.round(Math.random() * 7)
    createFirework(blastRadius, particles, circles, color, null,null,null,null,true,false)
}

function delay(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (DB.currentPage < 4) {
                reject()
                return
            }
            resolve()
        }, time)
    })
}
