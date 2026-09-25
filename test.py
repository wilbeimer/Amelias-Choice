from laya import Router

router = Router()  # downloads a checkpoint on first use; Router(preload=True) loads all three up front

state = "I have been struggling to keep down food. I don't feel sick, but just have no appetite."
questions = {
    "food": {"type": "choice", "instructions": "Which food should I make myself?",
                   "criteria": {"ramen": "shin ramen with egg",
                                "bread": "just plain french bread",
                                "other": "something else"}},
}

result = router.predict(state, questions)
print(result["answers"]["food"]["choice"])  # billing
# print(result["routing"]["model"])                 # english
