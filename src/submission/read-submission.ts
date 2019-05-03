import { identify } from '../db/token'
import { read as readUser } from '../db/user'
import { read as readSubmission } from '../db/submission'

export default async function (token: string, submissionId: number) {
    const username = await identify(token)
    const { acceptedProblem, privileged } = await readUser(username)
    const submission = await readSubmission(submissionId)
    if (
        !privileged &&
        submission.user !== username &&
        !acceptedProblem.includes(submission.problem)
    ) submission.code = null
    return submission
}
