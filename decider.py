from laya import Router

#router = Router()  # downloads a checkpoint on first use; Router(preload=True) loads all three up front


def make_decision(router: Router, option1: str, option2: str, context: str):
    state = context
    questions = {
        "decision": {
            "type": "choice",
            "instructions": "Which option should I pick?",
            "criteria": {
                f"{option1}": f"{option1}",
                f"{option2}": f"{option2}",
            }
        },
    }

    result = router.predict(state, questions)
    return result["answers"]["decision"]["choice"]  # billing
    # print(result["routing"]["model"])                 # english
