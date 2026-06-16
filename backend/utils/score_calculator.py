def calculate_final_score(regex_score, ml_prediction):

    ml_score = 70 if ml_prediction == 1 else 20

    final_score = regex_score + ml_score

    if final_score > 100:
        final_score = 100

    return final_score