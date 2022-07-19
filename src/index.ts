import {
	wrapval,
	ruledef,
	typedef,
	typeinit,
	bool,
	int32,
    float64,
	string,
	array,
	TypeDesc,
    Struct,
} from 'rainforest-js'

import { mock } from 'mockjs'

const at_mock: any = wrapval({ '@mock': true })

/**
 * @public
 */
export const Id = typedef({
	'@type': string, // 待修饰的类型，所以 Id 是 string 的修饰类型，依然是 string
	'@mock': () => mock('@id'), // 可选，如果没有则使用类型的默认初始值
})

/**
 * @public
 */
export const Name = typedef({
	'@type': string,
	'@mock': () => mock('@name'),
})

/**
 * @public
 */
export const Sex = typedef({
	'@type': string,
	'@mock': () => (Math.random() > 0.5 ? 'male' : 'female'),
	'@value': () => 'unknown', // 可以自定义 string 的默认初始值
})

/**
 * @public
 */
export const Birthday = typedef({
	'@type': string,
	'@mock': () => mock('@date'),
	'@value': () => '2000-01-02',
})

/**
 * @public
 */
export const Avatar = typedef({
	'@type': string,
	'@mock': () => mock('@image("120x120")'),
	'@value': () => 'https://example.com/default-avatar.png',
})

/**
 * @public
 */
export const Text = typedef({
	'@type': string,
	'@mock': () => mock('@sentence(5)'),
})

/**
 * @public
 */
export const User = typedef({
	id: Id,
	name: Name,
	sex: Sex,
	birthday: Birthday,
	avatar: Avatar,
})

/**
 * @public
 */
export const Comment = typedef({
	user: User,
	text: Text,
	id: Id,
	praise: int32,
})

/**
 * @public
 */
export const Comments = typedef({
	'@type': <TypeDesc<typeinit<typeof Comment>[]>>array,
	'@mock': (me: any) => {
		const self: typeinit<typeof Comments> = me
		for (let i = 0; i < 3; i++) {
			self.push(typeinit(Comment, at_mock))
		}
		return me
	},
})

function dump(fmt: string, v: unknown) {
	console.log.call(null, fmt, JSON.stringify(v, null, 2))
    console.log()
}

// 初始化（使用模拟数据）
const user = typeinit(User, at_mock)
dump('user', user)

const comments = typeinit(Comments, at_mock)
dump('comments', comments)
