function Plot( rScale ){
	//default rScale .2
    //percentage of available width that cirlces take up on plot
	this.rScale = rScale;
    this.r;
    this.maxValue; 

}

Plot.prototype = {
    constructor: Plot,
    /**saveScore:function (theScoreToAdd)  {
        this.quizScores.push(theScoreToAdd)
    },
    showNameAndScores:function ()  {
        var scores = this.quizScores.length > 0 ? this.quizScores.join(",") : "No Scores Yet";
        return this.name + " Scores: " + scores;
    },
    changeEmail:function (newEmail)  {
        this.email = newEmail;
        return "New Email Saved: " + this.email;
    }*/
}