import { task, strict } from 'foy'
import dev from './config/task.dev'
import build from './config/task.build'

strict()

task('dev', dev)
task('build', build)
